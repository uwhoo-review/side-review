package com.sideReview.side.review

import com.sideReview.side.common.dto.RatingDto
import com.sideReview.side.review.dto.StarRatingCreateDto
import com.sideReview.side.review.dto.StarRatingUpdateDto
import com.sideReview.side.review.entity.UserStarRating
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class StarRatingService(val userStarRatingRepository: UserStarRatingRepository) {
    @Transactional
    fun saveStarRating(dto: StarRatingCreateDto, ip: String) {
        if (!userStarRatingRepository.existsByTargetIdAndWriterId(dto.contentId, ip)) {
            userStarRatingRepository.save(
                UserStarRating(
                    targetId = dto.contentId,
                    writerId = ip,
                    rating = dto.rating
                )
            )
        } else {
            // TODO : exception handling
            throw Exception("Duplicated star rating request")
        }
    }

    @Transactional
    fun editStarRating(dto: StarRatingUpdateDto, ip: String) {
        userStarRatingRepository.save(
            UserStarRating(
                id = dto.ratingId,
                targetId = dto.contentId,
                writerId = ip,
                rating = dto.rating
            )
        )
    }

    @Transactional
    fun deleteStartRating(id: String, ip: String) {
        userStarRatingRepository.deleteByTargetIdAndWriterId(id, ip)
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
}