package com.sideReview.side.common.document

import kotlinx.serialization.Serializable

@Serializable
data class PersonDocument(
    val id : Int,
    val sortingName : String,
    val name : String,
    val originalName : String,
    val profilePath : String?,
    val popularity : Float?,
    var cast : List<RoleInfo>?,
    var crew : List<JobInfo>?
)

@Serializable
data class RoleInfo(
    val role: String,
    val contentId: String
)

@Serializable
data class JobInfo(
    val job: String,
    val contentId: String
)