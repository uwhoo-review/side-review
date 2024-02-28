package com.sideReview.side.mypage

import com.sideReview.side.common.entity.UserFavoriteContent
import com.sideReview.side.common.entity.UserFavoriteContentIdClass
import com.sideReview.side.common.entity.UserFavoritePerson
import com.sideReview.side.common.entity.UserReport
import com.sideReview.side.common.repository.UserInfoRepository
import com.sideReview.side.common.util.MapperUtils
import com.sideReview.side.mypage.dto.*
import com.sideReview.side.mypage.repository.UserFavoriteContentRepository
import com.sideReview.side.mypage.repository.UserFavoritePersonRepository
import com.sideReview.side.mypage.repository.UserReportRepository
import com.sideReview.side.openSearch.OpensearchClient
import com.sideReview.side.review.StarRatingService
import com.sideReview.side.review.dto.PageRatedContentDto
import com.sideReview.side.review.dto.RatedContentDto
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import kotlin.jvm.optionals.getOrNull

@Service
class MyPageService(
    val opensearchClient: OpensearchClient,
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
            it.rating = starRatingService.getRatingByUserIdAndTargetId(it.id, userId)
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
    @Transactional
    fun deleteFavoritePerson(userId: String, personId: String) {
        val user = userInfoRepository.getReferenceById(userId)
        userFavoritePersonRepository.delete(
            UserFavoritePerson(
                personId,
                user
            )
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
            MapperUtils.mapFavoriteContentEntityToDto(
                userFavoriteContentRepository.findAllByUserInfo(
                    user
                )
            )
        val dtoList: MutableList<FavoriteContentDto> = mutableListOf()
        defaultDtoList.forEach {
            dtoList.add(getOneContent(it, user.userId))
        }
        return dtoList
    }

    fun getFavoritePeople(user: com.sideReview.side.common.entity.UserInfo): List<FavoritePersonDetailDto> {
        val favoritePeopleIdList =
            userFavoritePersonRepository.findAllByUserInfo(user).map { it.personId }
        val docList = opensearchClient.getAllPeople(favoritePeopleIdList)
        return MapperUtils.mapPersonDocumentToFavoriteDetailDto(docList)
    }

    fun getOneContent(defaultDto: FavoriteContentDto, userId: String): FavoriteContentDto {
        val oneContent = opensearchClient.getOneContent(defaultDto.id, userId)
        return MapperUtils.mapDetailToFavoriteContentDto(oneContent, defaultDto)
    }

    fun addFavoriteContent(userId: String, contentId: String): FavoriteContentDto {
        val user = userInfoRepository.getReferenceById(userId)
        if(userFavoriteContentRepository.existsByUserInfoAndContentId(user,contentId))
            throw Exception("This content already exists.")
        val curRank = userFavoriteContentRepository.findMaxRank(userId)
        val rank = if (curRank == null) 1 else curRank + 1
        userFavoriteContentRepository.save(
            UserFavoriteContent(
                contentId = contentId,
                rank = rank,
                userInfo = user
            )
        )
        return getOneContent(
            FavoriteContentDto(
                id = contentId,
                rank = rank,
                name = "",
                poster = "",
                date = "",
                provider = emptyList(),
            ), userId)
    }
    fun getMyRating(userId: String, pageable: PageRequest): PageRatedContentDto{
        val ratedContentDtoList : MutableList<RatedContentDto> = mutableListOf()
        val pageDto = starRatingService.getRatingsByWriterId(userId, pageable)
        val contentIdList = pageDto.contents.map { it.id }
        val docList = opensearchClient.getAllContents(contentIdList)

        val dtoMap = pageDto.contents.associateBy { it.id }
        val docMap = docList.associateBy { it.id }

        contentIdList.forEach{
            val dto = dtoMap[it]
            val doc = docMap[it]

            ratedContentDtoList.add(
                RatedContentDto(
                    id = it,
                    name = doc!!.name,
                    poster = doc.poster?: "",
                    userRating = dto!!.userRating
                )
            )
        }

        return PageRatedContentDto(ratedContentDtoList, pageDto.pageInfo)
    }

    fun getMyPage(userId: String): MyPageDto {
        val userReport = userReportRepository.findById(userId).getOrNull()
        val user = userInfoRepository.findById(userId).get()
        val captivatingPair = evaluatingService.getCaptivatingPerson(user)
        val unique = user?.let { evaluatingService.getUniqueRating(it) }

        val userInfo = UserInfo(
            id = userId,
            profile = user.profile,
            nickname = user.nickname,
            email = user.email?:""
        )
        val favorite = Favorite(
            person = getFavoritePeople(user),
            contents = getFavoriteContent(user),
            genre = if (user.preferGenre != null) MapperUtils.parseStringToList(user.preferGenre!!) else emptyList()
        )
        val report = Report(
            avgRating = if (userReport?.avgRating != null) String.format("%.2f", userReport.avgRating).toFloat() else 0.0f,
            maxRating = if (userReport?.maxRating != null) userReport.maxRating else 0.0f,
            reviewCount = userReport?.reviewCount?.toInt()?:0,
            ratingCount = userReport?.ratingCount?.toInt()?:0,
            ratings = starRatingService.getRatingByUserId(userId),
            genreFrequency = evaluatingService.getCaptivatingGenre(user),
            actor = if (captivatingPair?.first != null) Person(
                id = captivatingPair.first!!.first,
                name = captivatingPair.first!!.second
            ) else Person(),
            director = if (captivatingPair?.second != null) Person(
                id = captivatingPair.second!!.first,
                name = captivatingPair.second!!.second
            ) else Person(),
            unique = unique
        )
        return MyPageDto(
            user = userInfo,
            ott = if (user.preferOtt != null) MapperUtils.parseStringToList(user.preferOtt!!) else emptyList(),
            favorite = favorite,
            report = report
        )
    }
}