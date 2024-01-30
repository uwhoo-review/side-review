package com.sideReview.side.mypage

import com.sideReview.side.common.entity.UserInfo
import com.sideReview.side.mypage.dto.Genre
import com.sideReview.side.mypage.repository.UserFavoriteContentRepository
import com.sideReview.side.mypage.repository.UserFavoritePersonRepository
import com.sideReview.side.mypage.repository.UserReportRepository
import com.sideReview.side.openSearch.OpensearchClient
import com.sideReview.side.review.UserReviewRepository
import com.sideReview.side.review.UserStarRatingRepository
import org.springframework.stereotype.Service

@Service
class EvaluatingService(
    val userStarRatingRepository: UserStarRatingRepository,
    val userReportRepository: UserReportRepository,
    val userReviewRepository: UserReviewRepository,
    val opensearchClient: OpensearchClient
) {
    fun getCaptivatingPerson(user: UserInfo): Pair<Pair<Int, String>?, Pair<Int, String>?> {
        val ratedContentList = userStarRatingRepository.findAllByWriterId(user.userId)
        val contentPeoplePair = opensearchClient.sumAllContentsPeople(ratedContentList)

        val captivatingActor = if(contentPeoplePair.first != null) findCaptivatingPerson(contentPeoplePair.first) else null
        val captivatingDirector = if(contentPeoplePair.second != null) findCaptivatingPerson(contentPeoplePair.second) else null

        return Pair(captivatingActor, captivatingDirector)
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
        val userRatingList = userStarRatingRepository.findAllByWriterId(user.userId)

    }

    private fun findCaptivatingPerson(personTripleList: List<Triple<Int, String, Float>>): Pair<Int, String>? {
        var maxPerson: Pair<Int, String>? = null
        val actorFrequencyMap = personTripleList.groupingBy { it.first }.eachCount()

        // 가장 많이 등장한 id를 찾기
        val maxCount = actorFrequencyMap.maxOfOrNull { it.value }
        val mostFrequentIds = actorFrequencyMap.filterValues { it == maxCount }.keys

        // 가장 많이 등장한 id들 중에서 rating 평균이 가장 큰 id 찾기
        val highestAverageRatingId = mostFrequentIds.maxByOrNull { id ->
            personTripleList.filter { it.first == id }.map { it.third }.average()
        }

        var actorName = ""
        personTripleList.forEach {
            if (it.first == highestAverageRatingId) actorName = it.second
        }

        if (highestAverageRatingId != null) maxPerson = Pair(first = highestAverageRatingId, second = actorName)
        return maxPerson
    }
}