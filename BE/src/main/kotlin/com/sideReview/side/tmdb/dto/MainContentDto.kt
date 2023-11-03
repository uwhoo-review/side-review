package com.sideReview.side.tmdb.dto

data class MainContentDto(
    val popular: List<ContentDto>,
    val latest: List<ContentDto>
)