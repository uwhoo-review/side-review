package com.sideReview.side.mypage.repository

import com.sideReview.side.common.entity.UserFavoriteContent
import com.sideReview.side.common.entity.UserFavoriteContentIdClass
import com.sideReview.side.common.entity.UserInfo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface UserFavoriteContentRepository : JpaRepository<UserFavoriteContent, UserFavoriteContentIdClass> {
    fun findAllByUserInfo(userInfo: UserInfo): List<UserFavoriteContent>

    @Query("SELECT MAX(f.rank) FROM UserFavoriteContent f WHERE f.userInfo.userId = :userId")
    fun findMaxRank(@Param("userId") userId: String): Int?

    fun existsByUserInfoAndContentId(userInfo: UserInfo, contentId: String) : Boolean
}