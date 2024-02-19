package com.sideReview.side.review.dto

import com.sideReview.side.common.dto.UserInfoDto
import kotlinx.serialization.Serializable

@Serializable
data class ReviewDto(
    val total: Int,
    val review: List<ReviewDetailDto>
)

@Serializable
data class ReviewDetailDto @JvmOverloads constructor(
    val id: String = "",
    val user: UserInfoDto = UserInfoDto(),
    val content: String = "",
    val date: String = "",
    val like: Int = 0,
    val dislike: Int = 0,
    val spoiler: Boolean = false
)