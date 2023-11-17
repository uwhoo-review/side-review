package com.sideReview.side.tmdb.dto

import com.sideReview.side.common.document.JobInfo
import com.sideReview.side.common.document.RoleInfo

data class CreditDto(
    val roleDto: List<RoleDto>?,
    val jobIDto: List<JobDto>?
)
data class RoleDto(
    val role : String,
    val personId : Int
)
data class JobDto(
    val job : String,
    val personId : Int
)