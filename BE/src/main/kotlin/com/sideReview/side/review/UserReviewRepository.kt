package com.sideReview.side.review

import com.sideReview.side.review.entity.UserReview
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository

interface UserReviewRepository : JpaRepository<UserReview, String> {
    fun findByTargetId(id: String): List<UserReview>
    fun findByTargetIdAndSpoilerIs(id: String, spoiler: String): List<UserReview>
    fun findByTargetIdOrderByLikeDescDislikeAsc(id: String): List<UserReview>
    fun findByTargetIdOrderByCreate(id: String): List<UserReview>
    fun findByTargetIdAndSpoilerIsOrderByLikeDescDislikeAsc(
        id: String,
        spoiler: String
    ): List<UserReview>

    fun findByTargetIdAndSpoilerIsOrderByCreate(id: String, spoiler: String): List<UserReview>
    fun findAllByTargetIdInAndSpoilerIsOrderByLikeDescDislikeAsc(ids: List<String>, spoiler: String): List<UserReview>
    fun findAllByTargetIdOrderByLikeDescDislikeAsc(id: String, pageable: Pageable): Page<UserReview>
    fun findAllByTargetIdOrderByCreateDesc(id: String, pageable: Pageable): Page<UserReview>
    fun findAllByTargetIdAndSpoilerIsOrderByLikeDescDislikeAsc(id: String, spoiler: String, pageable: Pageable): Page<UserReview>
    fun findAllByTargetIdAndSpoilerIsOrderByCreateDesc(id: String, spoiler: String, pageable: Pageable): Page<UserReview>
}