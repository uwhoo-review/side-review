package com.sideReview.side.review

import com.sideReview.side.review.entity.UserReview
import org.springframework.data.repository.CrudRepository

interface UserReviewRepository : CrudRepository<UserReview, String> {
    fun findByTargetId(id: String): List<UserReview>
    fun findByTargetIdAndSpoilerIs(id: String, spoiler: String): List<UserReview>
    fun findByTargetIdOrderByLikeDescAndOrderByDislikeAsc(id: String): List<UserReview>
    fun findByTargetIdOrderByCreate(id: String): List<UserReview>
    fun findByTargetIdAndSpoilerIsOrderByLikeDescAndOrderByDislikeAsc(
        id: String,
        spoiler: String
    ): List<UserReview>

    fun findByTargetIdAndSpoilerIsOrderByCreate(id: String, spoiler: String): List<UserReview>

}