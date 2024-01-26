package com.sideReview.side.mypage

import com.sideReview.side.common.entity.*
import com.sideReview.side.common.repository.UserInfoRepository
import com.sideReview.side.common.util.MapperUtils
import com.sideReview.side.mypage.dto.*
import com.sideReview.side.mypage.dto.UserInfo
import com.sideReview.side.mypage.repository.UserFavoriteContentRepository
import com.sideReview.side.mypage.repository.UserFavoritePersonRepository
import com.sideReview.side.mypage.repository.UserReportRepository
import com.sideReview.side.openSearch.OpensearchClient
import com.sideReview.side.review.StarRatingService
import com.sideReview.side.review.UserStarRatingRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class MyPageService(
    val opensearchClient: OpensearchClient,
    val userStarRatingRepository: UserStarRatingRepository,
    val userFavoritePersonRepository: UserFavoritePersonRepository,
    val userInfoRepository: UserInfoRepository,
    val userFavoriteContentRepository: UserFavoriteContentRepository,
    val userReportRepository: UserReportRepository,
    val starRatingService: StarRatingService,
    val evaluatingService: EvaluatingService
) {
    suspend fun getKeywordContent(
        userId: String,
        keyword: String,
        page: Int,
        size: Int
    ): FavoriteContentSearchPageDto {
        val contents = opensearchClient.getContents(keyword, page, size)
        contents.content.forEach {
            it.rating = userStarRatingRepository.findOneByTargetIdAndWriterId(
                it.id,
                userId
            )?.rating.toString()
        }
        return contents
    }

    suspend fun getKeywordPerson(
        keyword: String,
        page: Int,
        size: Int
    ): FavoritePersonDto {
        return opensearchClient.getMatchPeople(keyword, page, size)
    }

    @Transactional
    fun saveFavoritePerson(userId: String, personId: String): UserFavoritePerson {
        val user = userInfoRepository.getReferenceById(userId)
        return userFavoritePersonRepository.save(
            UserFavoritePerson(personId = personId, userInfo = user)
        )
    }

    fun getOnePerson(personId: String): FavoritePersonDetailDto {
        val onePerson = opensearchClient.getOnePerson(personId)
        return MapperUtils.mapDetailToFavoritePersonDetail(onePerson)
    }

    @Transactional
    fun deleteFavoriteContent(
        userId: String,
        contentId: String
    ) {
        userFavoriteContentRepository.deleteById(
            UserFavoriteContentIdClass(
                userId,
                contentId
            )
        )
    }

    @Transactional
    fun saveFavoriteContent(
        userId: String,
        favoriteContentDtoList: List<FavoriteContentInputDto>
    ): List<FavoriteContentDto> {
        val user = userInfoRepository.getReferenceById(userId)
        userFavoriteContentRepository.saveAll(
            MapperUtils.mapFavoriteContentDtoToEntity(
                favoriteContentDtoList,
                user
            )
        )
        return getFavoriteContent(user)
    }

    @Transactional
    fun saveOTT(userId: String, ottList: List<Int>) {
        val user = userInfoRepository.getReferenceById(userId)
        user.preferOtt = ottList.toString()
        userInfoRepository.save(user)
    }

    @Transactional
    fun saveGenre(userId: String, genreList: List<Int>) {
        val user = userInfoRepository.getReferenceById(userId)
        user.preferGenre = genreList.toString()
        userInfoRepository.save(user)
    }

    fun getFavoriteContent(user: com.sideReview.side.common.entity.UserInfo): List<FavoriteContentDto> {
        val defaultDtoList =
            MapperUtils.mapFavoriteContentEntityToDto(userFavoriteContentRepository.findAllByUserInfo(user))
        val dtoList: MutableList<FavoriteContentDto> = mutableListOf()
        defaultDtoList.forEach {
            dtoList.add(getOneContent(it, user.userId))
        }
        return dtoList
    }

    fun getOneContent(defaultDto: FavoriteContentDto, userId: String): FavoriteContentDto {
        val oneContent = opensearchClient.getOneContent(defaultDto.id, userId)
        return MapperUtils.mapDetailToFavoriteContentDto(oneContent, defaultDto)
    }

    fun getMyPage(userId: String): MyPageDto {
        val userReport = userReportRepository.findById(userId).get()
        val user = userInfoRepository.findById(userId).get()
        val test = evaluatingService.getCaptivatingPerson(user)
        println(test)

        val userInfo = UserInfo(
            id = userId,
            profile = "",
            nickname = user.nickname,
            email = ""
        )
        val favorite = Favorite(
            person = emptyList(),
            contents = getFavoriteContent(user),
            genre = if (user.preferGenre != null) MapperUtils.parseStringToList(user.preferGenre!!) else emptyList()
        )
        val report = Report(
            avgRating = userReport.avgRating?.toFloat(),
            maxRating = userReport.maxRating?.toFloat(),
            ratingCount = userReport.ratingCount?.toInt(),
            ratings = starRatingService.getRatingByUserId(userId),
            genreFrequency = evaluatingService.getCaptivatingGenre(user)
        )
        return MyPageDto(
            user = userInfo,
            ott = if (user.preferOtt != null) MapperUtils.parseStringToList(user.preferOtt!!) else emptyList(),
            favorite = favorite,
            report = report
        )
    }
}