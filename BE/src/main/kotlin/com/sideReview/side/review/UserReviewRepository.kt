package com.sideReview.side.review

import com.sideReview.side.review.entity.UserReview
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository

interface UserReviewRepository : JpaRepository<UserReview, String> {
    fun findByTargetId(id: String): List<UserReview>
    fun countAllByTargetId(id: String): Int

    fun findByTargetIdAndSpoilerIsOrderByCreate(id: String, spoiler: String): List<UserReview>
    fun findAllByTargetIdInAndSpoilerIsOrderByLikeDescDislikeAsc(
        ids: List<String>,
        spoiler: String
    ): List<UserReview>

    fun findAllByTargetIdOrderByLikeDescDislikeAsc(id: String, pageable: Pageable): Page<UserReview>
    fun findAllByTargetIdOrderByCreateDesc(id: String, pageable: Pageable): Page<UserReview>
    fun findAllByTargetIdAndSpoilerIsOrderByLikeDescDislikeAsc(
        id: String,
        spoiler: String,
        pageable: Pageable
    ): Page<UserReview>

    fun findAllByTargetIdAndSpoilerIsOrderByCreateDesc(
        id: String,
        spoiler: String,
        pageable: Pageable
    ): Page<UserReview>

    fun findAllByWriterId(id: String): List<UserReview>
    fun findAllByTargetIdAndUserTypeAndSpoilerIsOrderByLikeDescDislikeAsc(
        id: String, userType: String, spoiler: String, pageable: Pageable
    ): Page<UserReview>

    fun findAllByTargetIdAndUserTypeAndSpoilerIsOrderByCreateDesc(
        id: String, type: String, spoiler: String, pageable: PageRequest
    ): Page<UserReview>

    fun findAllByTargetIdAndUserTypeAndOrderByLikeDescDislikeAsc(
        id: String,
        type: String,
        pageable: PageRequest
    ): Page<UserReview>

    fun findAllByTargetIdAndUserTypeOrderByCreateDesc(
        id: String,
        type: String,
        pageable: PageRequest
    ): Page<UserReview>
}