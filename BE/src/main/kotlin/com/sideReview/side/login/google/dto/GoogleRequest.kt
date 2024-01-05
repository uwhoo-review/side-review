package com.sideReview.side.login.google.dto

data class GoogleRequest(
    val code:String,
    val redirect_uri:String,
    val client_id:String = "866692341598-qivtd4h8qr8qklciift1e3b1ha8e0fao.apps.googleusercontent.com",
    val client_secret:String = "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",
    val grant_type:String = "authorization_code"

)