package com.sideReview.side.mypage.repository

import com.sideReview.side.common.entity.UserFavoriteContent
import com.sideReview.side.common.entity.UserFavoriteContentIdClass
import com.sideReview.side.common.entity.UserInfo
import org.springframework.data.jpa.repository.JpaRepository

interface UserFavoriteContentRepository : JpaRepository<UserFavoriteContent, UserFavoriteContentIdClass> {
    fun findAllByUserInfo(userInfo: UserInfo) : List<UserFavoriteContent>
}