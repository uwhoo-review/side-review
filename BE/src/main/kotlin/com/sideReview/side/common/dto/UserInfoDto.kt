package com.sideReview.side.common.dto

import com.sideReview.side.common.entity.UserInfo
import kotlinx.serialization.Serializable

@Serializable
data class UserInfoDto @JvmOverloads constructor(
    val id: String = "",
    var nickname: String = "",
    var profile: String = "",
    val type: String = "",
    val email: String? = "",
    val toggle: Boolean? = false,
    val token: String? = ""
) {
    constructor(user: UserInfo, token: String) : this(
        user.userId,
        user.nickname,
        user.profile,
        user.loginType,
        user.email,
        user.toggle == 1,
        token
    )
}