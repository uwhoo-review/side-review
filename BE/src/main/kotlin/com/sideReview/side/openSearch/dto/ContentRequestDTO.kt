package com.sideReview.side.openSearch.dto

data class ContentRequestDTO(
    val tab: String?,
    val sort: String?,
    val query: String?,
    var filter: MutableList<ContentRequestFilterDetail>?,
    val pagination: Int?
)

data class ContentRequestFilterDetail(
    val type: String,
    val value: List<String?>
)