package com.sideReview.side.openSearch.dto

data class ContentRequestDTO(
    val filter: List<ContentRequestFilterDetail>
)

data class ContentRequestFilterDetail(
    val type: String,
    val value: List<String?>
)