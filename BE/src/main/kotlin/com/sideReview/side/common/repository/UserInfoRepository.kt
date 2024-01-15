package com.sideReview.side.common.repository

import com.sideReview.side.common.entity.UserInfo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserInfoRepository : JpaRepository<UserInfo, String> {
    fun existsByNickname(name: String): Boolean
}