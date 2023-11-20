package com.sideReview.side.common.document

data class PersonDocument(
    val id : Int,
    val name : String,
    val profilePath : String?,
    val popularity : Float?,
    var cast : List<RoleInfo>?,
    var crew : List<JobInfo>?
)

data class RoleInfo(
    val role: String,
    val contentId: String
)

data class JobInfo(
    val job: String,
    val contentId: String
)