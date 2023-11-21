package com.sideReview.side.review

import com.sideReview.side.review.dto.ReviewDTO
import com.sideReview.side.review.dto.ReviewDetail
import com.sideReview.side.review.entity.UserReview
import org.springframework.stereotype.Service

@Service
class ReviewService(val userReviewRepository: UserReviewRepository) {
    fun get(id: String, sort: String?, spoiler: Boolean?): ReviewDTO {
        val reviews = userReviewRepository.findByTargetId(id)
        return ReviewDTO(reviews.size, mapUserReviewToReviewDetailDTO(reviews))
    }

    fun mapUserReviewToReviewDetailDTO(review: List<UserReview>): List<ReviewDetail> {
        val details = mutableListOf<ReviewDetail>()

        for (r in review) {
            details.add(
                ReviewDetail(
                    id = r.reviewId,
                    content = r.content,
                    date = r.create,
                    like = r.like,
                    dislike = r.dislike,
                    spoiler = r.spoiler == "0"
                )
            )
        }

        return details
    }
}