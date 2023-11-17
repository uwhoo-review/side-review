package com.sideReview.side.openSearch.dto

import com.sideReview.side.tmdb.dto.ContentDto

data class MainContentDto(
    val popular: List<ContentDto>,
    val latest: List<ContentDto>
)