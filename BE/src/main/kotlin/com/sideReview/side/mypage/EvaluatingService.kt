package com.sideReview.side.mypage

import com.sideReview.side.common.entity.UserInfo
import com.sideReview.side.mypage.dto.Genre
import com.sideReview.side.mypage.repository.UserFavoriteContentRepository
import com.sideReview.side.mypage.repository.UserFavoritePersonRepository
import com.sideReview.side.openSearch.OpensearchClient
import com.sideReview.side.review.UserReviewRepository
import com.sideReview.side.review.UserStarRatingRepository
import org.springframework.stereotype.Service

@Service
class EvaluatingService(
    val userStarRatingRepository: UserStarRatingRepository,
    val userFavoritePersonRepository: UserFavoritePersonRepository,
    val userFavoriteContentRepository: UserFavoriteContentRepository,
    val userReviewRepository: UserReviewRepository,
    val opensearchClient: OpensearchClient
) {
    fun getCaptivatingPerson(user: UserInfo) {
        val ratedContentIdList =
            userStarRatingRepository.findByWriterIdAndRatingGreaterThan(user.userId, 3.5f).map { it.targetId }
        val favoritePersonList = userFavoritePersonRepository.findAllByUserInfo(user).map { it.personId }
        val favoriteContentIdList = userFavoriteContentRepository.findAllByUserInfo(user).map { it.contentId }
        val contentIdList: List<String> = (ratedContentIdList+favoriteContentIdList).toList()
        val contentPeoplePair = opensearchClient.sumAllContentsPeople(contentIdList)

        contentPeoplePair.first //actors
        contentPeoplePair.second //directors
    }

    fun getCaptivatingGenre(user: UserInfo): List<Genre> {
        val reviewedContentIdList = userReviewRepository.findByTargetId(user.userId).map { it.targetId }.toList()
        val ratedContentIdList = userStarRatingRepository.findAllByWriterId(user.userId).map { it.targetId }.toList()
        val contentIdList: List<String> = (ratedContentIdList + reviewedContentIdList).toList()
        val frequencyMap = opensearchClient.sumAllContentsGenre(contentIdList).groupingBy { it }.eachCount()

        return frequencyMap.entries.sortedByDescending { it.value }.take(5)
            .map { Genre(genre = it.key, count = it.value) }
    }

    fun getUniqueRating(user: UserInfo) {

    }

}