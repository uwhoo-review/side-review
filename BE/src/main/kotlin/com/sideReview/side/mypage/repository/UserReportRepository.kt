package com.sideReview.side.mypage.repository

import com.sideReview.side.common.entity.UserReport
import org.springframework.data.jpa.repository.JpaRepository

interface UserReportRepository : JpaRepository<UserReport, String> {
}