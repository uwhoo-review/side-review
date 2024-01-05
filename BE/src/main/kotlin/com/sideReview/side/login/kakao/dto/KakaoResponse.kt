package com.sideReview.side.login.kakao.dto

data class KakaoAuthResponse(
    val token_type: String,
    val access_token: String,
    val expires_in: String,
    val refresh_token: String,
    val refresh_token_expires_in: String
)

data class KakaoProfileResponse(
    val id: Long,
    val kakao_account: KakaoAccount,
)


//참고 : https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#kakaoaccount
data class KakaoAccount(
    val profile: KakaoProfileDetail,
    val is_email_valid: Boolean,
    val email: String
)

data class KakaoProfileDetail(
    val nickname: String?,
    val thumbnail_image_url: String?,
    val profile_image_url: String?,
    val is_default_image: Boolean
)