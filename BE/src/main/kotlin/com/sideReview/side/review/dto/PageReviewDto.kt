package com.sideReview.side.review.dto

import com.sideReview.side.common.dto.PageInfoDto

data class PageReviewDto(
    val reviewDTO: ReviewDto,
    val pageInfo: PageInfoDto
)
