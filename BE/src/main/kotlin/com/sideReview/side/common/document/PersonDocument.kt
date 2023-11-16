package com.sideReview.side.common.document

import com.sideReview.side.tmdb.dto.CastInfo

data class PersonDocument(
    val id : Int,
    val name : String,
    val profilePath : String?,
    val popularity : Float?,
    val cast : List<RoleInfo>?,
    val crew : List<JobInfo>?
)

data class RoleInfo(
    val role : String,
    val contentId : Int
)

data class JobInfo(
    val job : String,
    val contentId : Int
)