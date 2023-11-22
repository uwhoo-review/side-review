package com.sideReview.side.review

import com.sideReview.side.review.dto.ReviewDTO
import com.sideReview.side.review.dto.ReviewDetail
import com.sideReview.side.review.entity.UserReview
import org.springframework.stereotype.Service

@Service
class ReviewService(val userReviewRepository: UserReviewRepository) {
    fun get(id: String, sort: String?, spoiler: Boolean?): ReviewDTO {
        var reviews: List<UserReview> = listOf()
        if (spoiler != null) {
            if (spoiler) {
                if (!sort.isNullOrBlank()) {
                    reviews =
                        if (sort == "best")
                            userReviewRepository.findByTargetIdOrderByLikeDescAndOrderByDislikeAsc(
                                id
                            )
                        else userReviewRepository.findByTargetIdOrderByCreate(id)
                } else reviews = userReviewRepository.findByTargetId(id)
            } else {
                if (!sort.isNullOrBlank()) {
                    reviews =
                        if (sort == "best")
                            userReviewRepository.findByTargetIdAndSpoilerIsOrderByLikeDescAndOrderByDislikeAsc(
                                id,"0"
                            )
                        else userReviewRepository.findByTargetIdAndSpoilerIsOrderByCreate(id,"0")
                } else
                    reviews = userReviewRepository.findByTargetIdAndSpoilerIs(id, "0")
            }
        }

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