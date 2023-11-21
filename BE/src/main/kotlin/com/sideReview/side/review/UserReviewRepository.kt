package com.sideReview.side.review

import com.sideReview.side.review.entity.UserReview
import org.springframework.data.repository.CrudRepository

interface UserReviewRepository : CrudRepository<UserReview, String> {
    fun findByTargetId(id: String): List<UserReview>
}