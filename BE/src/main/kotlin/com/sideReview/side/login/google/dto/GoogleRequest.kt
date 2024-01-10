package com.sideReview.side.login.google.dto

data class GoogleRequest(
    val code:String,
    val redirect_uri:String,
    val client_id:String = "866692341598-2ng40irpued2c75s4vnt3cnrljc8oh9k.apps.googleusercontent.com",
    val client_secret:String = "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",
    val grant_type:String = "authorization_code"

)