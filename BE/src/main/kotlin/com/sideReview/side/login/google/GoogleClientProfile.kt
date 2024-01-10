package com.sideReview.side.login.google

import com.sideReview.side.login.google.dto.GoogleAuthResponse
import com.sideReview.side.login.google.dto.GoogleProfileResponse
import com.sideReview.side.login.google.dto.GoogleRequest
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam


@FeignClient(name = "googleProfile", url = "https://www.googleapis.com")
interface GoogleClientProfile {
    @GetMapping("/userinfo/v2/me")
    fun getProfile(@RequestParam("access_token") accessToken: String): GoogleProfileResponse
}