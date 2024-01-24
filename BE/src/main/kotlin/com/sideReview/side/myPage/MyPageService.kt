package com.sideReview.side.myPage

import com.sideReview.side.common.entity.UserFavoriteContent
import com.sideReview.side.common.entity.UserFavoriteContentIdClass
import com.sideReview.side.common.entity.UserFavoritePerson
import com.sideReview.side.common.entity.UserInfo
import com.sideReview.side.common.repository.UserInfoRepository
import com.sideReview.side.common.util.MapperUtils
import com.sideReview.side.myPage.dto.*
import com.sideReview.side.myPage.repository.UserFavoriteContentRepository
import com.sideReview.side.myPage.repository.UserFavoritePersonRepository
import com.sideReview.side.openSearch.OpensearchClient
import com.sideReview.side.review.UserStarRatingRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class MyPageService(
    val opensearchClient: OpensearchClient,
    val userStarRatingRepository: UserStarRatingRepository,
    val userFavoritePersonRepository: UserFavoritePersonRepository,
    val userInfoRepository: UserInfoRepository,
    val userFavoriteContentRepository: UserFavoriteContentRepository
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

    fun deleteFavoriteContent(userId: String, contentId: String) {
        userFavoriteContentRepository.deleteById(UserFavoriteContentIdClass(userId, contentId))
    }

    fun saveFavoriteContent(
        userId: String,
        favoriteContentDtoList: List<FavoriteContentInputDto>
    ){
        val user = userInfoRepository.getReferenceById(userId)
        userFavoriteContentRepository.saveAll(
            MapperUtils.mapFavoriteContentDtoToEntity(
                favoriteContentDtoList,
                user
            )
        )
    }
}