package com.sideReview.side.common.dto

import kotlinx.serialization.Serializable

@Serializable
data class UserInfoDto(
    val id: String,
    var nickname: String,
    var profile: String,
    val type: String
)