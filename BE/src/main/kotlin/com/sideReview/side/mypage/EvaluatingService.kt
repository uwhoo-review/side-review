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
    //2:5:3 으로 evaluate
    val userStarRatingRepository: UserStarRatingRepository,
    val userFavoritePersonRepository: UserFavoritePersonRepository,
    val userFavoriteContentRepository: UserFavoriteContentRepository,
    val userReviewRepository: UserReviewRepository,
    val opensearchClient: OpensearchClient
) {
    fun getCaptivatingPerson(user: UserInfo) {

    }

    fun getCaptivatingGenre(user: UserInfo): List<Genre> {
        val reviewedContentIdList = userReviewRepository.findByTargetId(user.userId).map { it.targetId }.toList()
        val ratedContentIdList = userStarRatingRepository.findAllByWriterId(user.userId).map { it.targetId }.toList()

        val contentIdList: MutableList<String> = mutableListOf()
        contentIdList.addAll(ratedContentIdList)
        contentIdList.addAll(reviewedContentIdList)

        val frequencyMap = opensearchClient.sumAllContentsGenre(contentIdList).groupingBy { it }.eachCount()

        return frequencyMap.entries.sortedByDescending { it.value }.take(5)
            .map { Genre(genre = it.key, count = it.value) }
    }

    fun getUniqueRating(user: UserInfo) {

    }

}