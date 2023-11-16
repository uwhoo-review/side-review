package com.sideReview.side.tmdb.dto

import com.sideReview.side.common.document.JobInfo
import com.sideReview.side.common.document.RoleInfo

data class CreditDto(
    val roleInfo: List<RoleInfo>?,
    val jobInfo: List<JobInfo>?
)
