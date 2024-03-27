package com.sideReview.side.login.naver.dto

data class NaverAuthResponse(
    val access_token: String,
    val refresh_token: String,
    val token_type: String,
    val expires_in: Int,        // 토큰 유효 기간
    val error: String,
    val error_description: String
)

data class NaverProfileResponse(
    val resultcode: String,
    val message: String,
    val response: NaverProfileDetail
)

data class NaverProfileDetail(
    val id: String,         // naver ID 별 고유 값
    val nickname: String?,
    val name: String,
    val profile_image: String,
    val email: String
//    val gender: String,     // F:여성, M: 남성, U: 확인 불가
//    val age: String,
//    val birthday: String,   // format: MM-DD
//    val birthyear: String,
//    val mobile: String
)