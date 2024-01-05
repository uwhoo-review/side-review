package com.sideReview.side.login.google

import com.sideReview.side.login.google.dto.GoogleProfileResponse
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam


@FeignClient(name = "google")
interface GoogleClient {

    @GetMapping("/userinfo/v2/me")
    fun getProfile(@RequestParam("access_token") accessToken: String): GoogleProfileResponse
}