package com.sideReview.side.login.google.dto

data class GoogleAuthResponse(
    val access_token: String,
    val expires_in: String,
    val scope: String?,
    val token_type: String,
    val id_token: String,
)

data class GoogleProfileResponse(
    val id: String,
    val email: String,
    val verified_email: String,
    val name: String,
    val given_name: String,
    val family_name: String,
    val picture: String,
    val locale: String
)