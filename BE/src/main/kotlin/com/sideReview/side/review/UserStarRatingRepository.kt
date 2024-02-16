package com.sideReview.side.review

import com.sideReview.side.review.entity.UserStarRating
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserStarRatingRepository : JpaRepository<UserStarRating, Int>{
    fun findOneByTargetIdAndWriterId(contentId: String, writerId: String) : UserStarRating?
    fun findAllByTargetId(contentId : String) : List<UserStarRating>
    fun deleteByTargetIdAndWriterId(contentId: String, writerId: String)
    fun existsByTargetIdAndWriterId(contentId: String, writerId: String) : Boolean
    fun findByWriterIdAndRatingGreaterThan(writerId: String, rating: Float) : List<UserStarRating>
    fun findAllByWriterId(writerId: String) : List<UserStarRating>
    fun findAllByWriterId(writerId: String, pageable: Pageable): Page<UserStarRating>
    fun countAllByWriterId(writerId: String): Int
}