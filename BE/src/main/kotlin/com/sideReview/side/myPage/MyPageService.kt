package com.sideReview.side.myPage

import com.sideReview.side.common.entity.UserFavoritePerson
import com.sideReview.side.common.repository.UserInfoRepository
import com.sideReview.side.common.util.MapperUtils
import com.sideReview.side.myPage.dto.FavoriteContentPageDto
import com.sideReview.side.myPage.dto.FavoritePersonDetailDto
import com.sideReview.side.myPage.dto.FavoritePersonDto
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
) {
    suspend fun getKeywordContent(
        userId: String,
        keyword: String,
        page: Int,
        size: Int
    ): FavoriteContentPageDto {
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
}