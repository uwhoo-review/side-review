package com.sideReview.side.openSearch.dto

import com.sideReview.side.common.document.JobInfo
import com.sideReview.side.common.document.RoleInfo

data class DetailPersonDto(
    val name: String,
    val id: Int,
    val job: List<String>,
    val profilePath : String? = "",
    val cast: List<CastItem>? = emptyList(),
    val crew: List<CrewItem>? = emptyList()
)

data class CastItem(
    val contentName : String,
    val year : Int? = null,
    val contentId : String,
    val platform : List<Int> = emptyList(),
    val role : String,
    val poster : String? = ""
)

data class CrewItem(
    val contentName : String,
    val year : Int? = null,
    val contentId : String,
    val platform : List<Int>,
    val job : String,
    val poster : String
)
