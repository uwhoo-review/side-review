package com.sideReview.side.openSearch.dto

import com.sideReview.side.common.document.JobInfo
import com.sideReview.side.common.document.RoleInfo

data class DetailPersonDto(
    val name: String,
    val id: Int,
    val job: List<String>,
    val cast: List<RoleInfo>? = emptyList(),
    val crew: List<JobInfo>? = emptyList()
)
