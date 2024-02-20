package com.sideReview.side.review

import com.sideReview.side.review.entity.UserReviewEval
import org.springframework.data.jpa.repository.JpaRepository

interface UserReviewEvalRepository : JpaRepository<UserReviewEval, Int> {
    fun findByReviewId(reviewId: String) : UserReviewEval?
    fun findByReviewIdAndWriterId(reviewId: String, writerId: String) : UserReviewEval?
    fun countByReviewIdAndEval(reviewId: String, eval: Int) : Int
}