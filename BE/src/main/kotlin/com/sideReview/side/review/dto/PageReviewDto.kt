package com.sideReview.side.review.dto

import com.sideReview.side.common.dto.PageInfo

data class PageReviewDto(
    val reviewDTO: ReviewDTO,
    val pageInfo: PageInfo
)
