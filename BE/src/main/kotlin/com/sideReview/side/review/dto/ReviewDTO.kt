package com.sideReview.side.review.dto

import kotlinx.serialization.Serializable

@Serializable
data class ReviewDTO(
    val total: Int,
    val review: List<ReviewDetailDTO>
)

@Serializable
data class ReviewDetailDTO(
    val id: String,
    val content: String,
    val date: String,
    val like: Int,
    val dislike: Int,
    val spoiler: Boolean
)