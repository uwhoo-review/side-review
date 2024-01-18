package com.sideReview.side.review.dto

import com.sideReview.side.common.dto.PageInfo

data class PageReviewDto(
    val total: Int,
    val review: List<ReviewDetailDTO>,
    //TODO: reviewDTO  안애 위의 정보 넣기!! #convention
    //val reviewDTO: ReviewDTO,
    val pageInfo: PageInfo
)
