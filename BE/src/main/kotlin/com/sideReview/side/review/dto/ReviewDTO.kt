package com.sideReview.side.review.dto

import java.time.LocalDate

data class ReviewDTO(
    val total: Int,
    val review: List<ReviewDetail>
)

data class ReviewDetail(
    val id: String,
    val content: String,
    val date: LocalDate,
    val like: Int,
    val dislike: Int,
    val spoiler: Boolean
)