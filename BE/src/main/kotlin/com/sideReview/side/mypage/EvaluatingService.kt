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
    fun getCaptivatingPerson(user: UserInfo): Pair<Pair<Int, String>?, Pair<Int, String>?> {
        val ratedContentList = userStarRatingRepository.findAllByWriterId(user.userId)
        val contentPeoplePair = opensearchClient.sumAllContentsPeople(ratedContentList.map { it.targetId })

        val actorFrequencyMap = contentPeoplePair.first.groupingBy { it }.eachCount()
        val directorFrequencyMap = contentPeoplePair.second.groupingBy { it }.eachCount()

        val maxActorCnt = actorFrequencyMap.values.maxOrNull()
        val maxDirectorCnt = directorFrequencyMap.values.maxOrNull()

        var maxActor: Pair<Int, String>? = null
        var maxDirector: Pair<Int, String>? = null

        if(maxActorCnt != null){
            maxActor = actorFrequencyMap.filterValues { it == maxActorCnt }.keys.toList().random()
        }
        if(maxDirectorCnt != null){
            maxDirector = directorFrequencyMap.filterValues { it == maxDirectorCnt }.keys.toList().random()
        }
        return Pair(maxActor, maxDirector)
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