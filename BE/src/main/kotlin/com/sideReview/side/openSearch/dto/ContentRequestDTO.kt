package com.sideReview.side.openSearch.dto

data class ContentRequestDTO(
    val tab: String?,
    val sort: String?,
    val query: String?,
    val filter: List<ContentRequestFilterDetail>?,
    val pagination: Int?
)

data class ContentRequestFilterDetail(
    val type: String,
    val value: List<String?>
)