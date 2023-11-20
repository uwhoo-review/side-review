package com.sideReview.side.openSearch.dto

data class ContentRequestDTO(
    val tab: String?,
    val sort: String?,
    val query: String?,
    val filter: List<ContentRequestFilterDetail>?
)

data class ContentRequestFilterDetail(
    val type: String,
    val value: List<String?>
)