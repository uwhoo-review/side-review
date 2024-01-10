package com.sideReview.side.login.google

import com.sideReview.side.login.google.dto.GoogleAuthResponse
import com.sideReview.side.login.google.dto.GoogleRequest
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
@FeignClient(name = "googleAuth", url = "https://oauth2.googleapis.com")

interface GoogleClientAuth {
    @PostMapping("/token")
    fun getAuth(@RequestBody body: GoogleRequest): GoogleAuthResponse
}