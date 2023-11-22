package com.sideReview.side.review

import com.sideReview.side.review.dto.ReviewCreateDTO
import com.sideReview.side.review.dto.ReviewDTO
import com.sideReview.side.review.dto.ReviewDetailDTO
import com.sideReview.side.review.dto.ReviewEvaDTO
import com.sideReview.side.review.entity.UserReview
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate
import java.util.*

@Service
class ReviewService(val userReviewRepository: UserReviewRepository) {
    fun get(id: String, sort: String?, spoiler: Boolean): ReviewDTO {
        val reviews: List<UserReview>
        if (spoiler) {
            reviews = if (!sort.isNullOrBlank()) {
                if (sort == "best")
                    userReviewRepository.findByTargetIdOrderByLikeDescDislikeAsc(
                        id
                    )
                else userReviewRepository.findByTargetIdOrderByCreate(id)
            } else userReviewRepository.findByTargetId(id)
        } else {
            reviews = if (!sort.isNullOrBlank()) {
                if (sort == "best")
                    userReviewRepository.findByTargetIdAndSpoilerIsOrderByLikeDescDislikeAsc(
                        id, "0"
                    )
                else userReviewRepository.findByTargetIdAndSpoilerIsOrderByCreate(id, "0")
            } else
                userReviewRepository.findByTargetIdAndSpoilerIs(id, "0")
        }

        return ReviewDTO(reviews.size, mapUserReviewToReviewDetailDTO(reviews))
    }


    @Transactional
    fun create(review: ReviewCreateDTO, ip: String) {
        val uuid = UUID.randomUUID().toString()
        kotlin.runCatching {
            userReviewRepository.save(
                UserReview(
                    reviewId = uuid,
                    targetId = review.dramaId,
                    writerId = ip,
                    like = 0,
                    dislike = 0,
                    spoiler = if (review.spoiler) "1" else "0",
                    create = LocalDate.now(),
                    content = review.content
                )
            )
        }.onFailure {
            println("############################################")
            println("########### Error on Review Save ###########")
            println("############################################")
            System.err.println(it.message)
            System.err.println(it.stackTrace)
        }
    }


    fun mapUserReviewToReviewDetailDTO(review: List<UserReview>): List<ReviewDetailDTO> {
        val details = mutableListOf<ReviewDetailDTO>()
        for (r in review) {
            details.add(
                ReviewDetailDTO(
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

    @Transactional
    fun evaluate(body: ReviewEvaDTO) {
        userReviewRepository.findById(body.reviewId).ifPresent {
            if (body.eval == 0) it.dislike += 1
            else it.like += 1
        }
    }
}