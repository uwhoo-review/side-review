package com.sideReview.side.review

import com.sideReview.side.common.dto.PageInfoDto
import com.sideReview.side.common.dto.RatingDto
import com.sideReview.side.common.repository.UserInfoRepository
import com.sideReview.side.common.util.MapperUtils
import com.sideReview.side.mypage.dto.Rating
import com.sideReview.side.review.dto.*
import com.sideReview.side.review.entity.UserStarRating
import com.sideReview.side.review.exception.StarRatingSaveDuplicateException
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class StarRatingService(
    val userStarRatingRepository: UserStarRatingRepository,
    val userInfoRepository: UserInfoRepository
) {
    @Transactional
    fun saveStarRating(dto: StarRatingCreateDto, userId: String) {
        if (!userStarRatingRepository.existsByTargetIdAndWriterId(dto.contentId, userId)) {
            userStarRatingRepository.save(
                UserStarRating(
                    targetId = dto.contentId,
                    writerId = userId,
                    rating = dto.rating
                )
            )
        } else {
            // TODO : exception handling
            throw StarRatingSaveDuplicateException("Duplicated star rating request")
        }
    }

    @Transactional
    fun editStarRating(dto: StarRatingUpdateDto, userId: String) {
        if (userInfoRepository.existsById(userId)) {
            val entity = userStarRatingRepository.findOneByTargetIdAndWriterId(dto.contentId, userId)
            if(entity != null) {
                userStarRatingRepository.save(
                    UserStarRating(
                        id = entity.id,
                        targetId = dto.contentId,
                        writerId = userId,
                        rating = dto.rating
                    )
                )
            }
        }
        else throw Exception("Cannot update star rating. User Id not found.")
    }

    @Transactional
    fun deleteStartRating(id: String, userId: String) {
        userStarRatingRepository.deleteByTargetIdAndWriterId(id, userId)
    }

    private fun calculateWeightAverage(tmdbRating: Float?, id: String): Float {
        val tmdbWeight = 8
        val userWeight = 2

        val userRating = userStarRatingRepository.findAllByTargetId(id)
            .map { it.rating }
            .average().takeIf { it.isFinite() } ?: null

        var rating = tmdbRating ?: userRating ?: 0.0
        if (tmdbRating != null && userRating != null) {
            rating =
                ((tmdbRating * tmdbWeight) + (userRating * userWeight)) / (tmdbWeight + userWeight)
        }
        return String.format("%.2f", rating).toFloat()
    }

    fun getRating(tmdbRating: Float?, id: String, userId: String?): RatingDto {
        val userStarRatingList = userStarRatingRepository.findAllByTargetId(id)
        val userRating =
            if (userId != null)
                userStarRatingList.firstOrNull { it.writerId == userId }?.rating ?: 0.0f
            else 0.0f
        return RatingDto(
            calculateWeightAverage(tmdbRating, id),
            userStarRatingList.size,
            userRating
        )
    }

    fun getRatingByUserId(userId: String): List<Rating> {
        val userStarRatingList = userStarRatingRepository.findAllByWriterId(userId)
        val countMap = userStarRatingList.groupBy { it.rating }.mapValues { it.value.size }

        return countMap.entries.map { Rating(it.key, it.value) }
    }

    fun getRatingByUserIdAndTargetId(contentId: String, userId: String): Float {
        val rating = userStarRatingRepository.findOneByTargetIdAndWriterId(
            contentId,
            userId
        )
        return rating?.rating?: 0.0f
    }

    fun getRatingsByWriterId(userId: String, pageable: PageRequest): PageRatedContentDto {
        val userRating = userStarRatingRepository.findAllByWriterId(userId, pageable)
        val ratedContentDtoList = MapperUtils.mapRatingEntityToRatedContentDto(userRating.content)
        val totalPages = userRating.totalPages
        val totalElements = userRating.totalElements.toInt()

        return PageRatedContentDto(
            ratedContentDtoList,
            PageInfoDto(totalElements, totalPages, pageable.pageNumber)
        )
    }
}