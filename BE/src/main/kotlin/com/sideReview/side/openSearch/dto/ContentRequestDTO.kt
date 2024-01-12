package com.sideReview.side.openSearch.dto

data class ContentRequestDTO(
    val tab: String?,
    val sort: String?,
    val query: String?,
    var notQuery: List<String>?,
    var filter: MutableList<ContentRequestFilterDetail>?,
    var pagination: Int?
)

data class ContentRequestFilterDetail(
    val type: String,
    val value: List<String?>
)