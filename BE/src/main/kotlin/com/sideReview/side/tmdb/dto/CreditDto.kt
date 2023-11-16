package com.sideReview.side.tmdb.dto

import com.sideReview.side.tmdb.document.JobInfo
import com.sideReview.side.tmdb.document.RoleInfo

data class CreditDto(
    val roleInfo: List<RoleInfo>?,
    val jobInfo: List<JobInfo>?
)
