package com.sideReview.side.myPage.repository

import com.sideReview.side.common.entity.UserFavoriteContent
import com.sideReview.side.common.entity.UserFavoriteContentIdClass
import org.springframework.data.jpa.repository.JpaRepository

interface UserFavoriteContentRepository : JpaRepository<UserFavoriteContent, UserFavoriteContentIdClass> {
}