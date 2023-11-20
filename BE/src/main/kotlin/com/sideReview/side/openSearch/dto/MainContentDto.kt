package com.sideReview.side.openSearch.dto

data class MainContentDto(
    val popular: List<ContentDto>,
    val latest: List<ContentDto>
)