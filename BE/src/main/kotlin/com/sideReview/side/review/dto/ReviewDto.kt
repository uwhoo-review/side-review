package com.sideReview.side.review.dto

import kotlinx.serialization.Serializable

@Serializable
data class ReviewDto(
    val total: Int,
    val review: List<ReviewDetailDto>
)

@Serializable
data class ReviewDetailDto(
    val id: String,
    val content: String,
    val date: String,
    val like: Int,
    val dislike: Int,
    val spoiler: Boolean
)