package com.sideReview.side.mypage

import com.sideReview.side.common.entity.UserInfo
import com.sideReview.side.mypage.dto.Genre
import com.sideReview.side.mypage.dto.UniqueRating
import com.sideReview.side.openSearch.OpensearchClient
import com.sideReview.side.review.StarRatingService
import com.sideReview.side.review.UserReviewRepository
import com.sideReview.side.review.UserStarRatingRepository
import org.springframework.stereotype.Service
import kotlin.math.abs

@Service
class EvaluatingService(
    val userStarRatingRepository: UserStarRatingRepository,
    val userReviewRepository: UserReviewRepository,
    val opensearchClient: OpensearchClient,
    val starRatingService: StarRatingService
) {
    fun getCaptivatingPerson(user: UserInfo): Pair<Pair<Int, String>?, Pair<Int, String>?> {
        val ratedContentList = userStarRatingRepository.findAllByWriterId(user.userId)
        val contentPeoplePair = opensearchClient.sumAllContentsPeople(ratedContentList)

        val captivatingActor =
            if (contentPeoplePair.first != null) findCaptivatingPerson(contentPeoplePair.first) else null
        val captivatingDirector =
            if (contentPeoplePair.second != null) findCaptivatingPerson(contentPeoplePair.second) else null

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

    fun getUniqueRating(user: UserInfo): List<UniqueRating> {
        val ratedContentList = userStarRatingRepository.findAllByWriterId(user.userId)
        val ratedContentDocList = opensearchClient.getAllContents(ratedContentList.map { it.targetId })
        val avgRatingMap: MutableMap<String, Float> = mutableMapOf()
        val userRatingMap: Map<String, Float> = ratedContentList.associate { it.targetId to it.rating }

        ratedContentDocList.forEach {
            val avgRating = starRatingService.getRating(it.rating?.toFloat(), it.id, user.userId).rating
            avgRatingMap[it.id] = avgRating!!
        }

        val uniqueRatingList =
            avgRatingMap.entries.sortedByDescending { abs(it.value - userRatingMap[it.key]!!) }.take(3)
                .map {
                    UniqueRating(
                        id = it.key,
                        name = "",
                        poster = "",
                        rating = it.value,
                        userRating = userRatingMap[it.key]!!
                    )
                }.toMutableList()

        uniqueRatingList.forEach {
            if (abs(it.rating - it.userRating) > 1.5f) {
                val contentId = it.id
                val document = ratedContentDocList.find { it.id == contentId }
                it.name = document!!.name
                it.poster = document.poster ?: ""
            }
        }
        uniqueRatingList.removeIf { entry -> entry.name == "" }
        return uniqueRatingList
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