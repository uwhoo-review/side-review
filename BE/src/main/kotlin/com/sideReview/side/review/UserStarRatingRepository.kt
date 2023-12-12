package com.sideReview.side.review

import com.sideReview.side.review.entity.UserStarRating
import org.apache.catalina.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserStarRatingRepository : JpaRepository<UserStarRating, Int>{
    fun findOneByTargetIdAndWriterId(contentId: String, writerId: String) : UserStarRating
    fun findAllByTargetId(contentId : String) : List<UserStarRating>
    fun deleteByTargetIdAndWriterId(contentId: String, writerId: String)
    fun existsByTargetIdAndWriterId(contentId: String, writerId: String) : Boolean
    fun countByTargetId(contentId : String) : Int
}