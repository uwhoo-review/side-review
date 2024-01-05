package com.sideReview.side.login.google.dto

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