package com.sideReview.side.review.dto

data class PageReviewDto(
    val total: Int,
    val review: List<ReviewDetailDTO>,
    //TODO: reviewDTO  안애 위의 정보 넣기!! #convention
    //val reviewDTO: ReviewDTO,
    val pageInfo: PageInfo
)
data class PageInfo(
    // TODO: 공통으로 빼기!! #convention
    val totalElements: Int,
    val totalPages: Int,
    val page: Int,
)
