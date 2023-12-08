package com.sideReview.side.review.dto

data class PageReviewDto(
    val total: Int,
    val review: List<ReviewDetailDTO>,
    val pageInfo: PageInfo
)
data class PageInfo(
    val totalElements: Int,
    val totalPages: Int,
    val page: Int,
)
