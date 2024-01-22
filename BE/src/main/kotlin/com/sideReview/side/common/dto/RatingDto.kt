package com.sideReview.side.common.dto

import kotlinx.serialization.Serializable

@Serializable
data class RatingDto(
    val rating: Float? = null,
    val total: Int = 0,
    val user: Float? = null,
)
