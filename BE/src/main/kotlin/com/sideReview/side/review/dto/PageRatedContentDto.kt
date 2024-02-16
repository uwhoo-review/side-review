package com.sideReview.side.review.dto

import com.sideReview.side.common.dto.PageInfoDto

data class PageRatedContentDto(
    val contents: List<RatedContentDto>,
    val pageInfo: PageInfoDto
)

data class RatedContentDto(
    val id : String,
    val name : String,
    val poster : String? = "",
    val userRating : Float
)
