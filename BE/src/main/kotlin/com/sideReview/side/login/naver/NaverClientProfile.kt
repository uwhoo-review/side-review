package com.sideReview.side.login.naver

import com.sideReview.side.login.naver.dto.NaverAuthResponse
import com.sideReview.side.login.naver.dto.NaverProfileResponse
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestParam

@FeignClient(name = "naverProfile", url = "https://openapi.naver.com")
interface NaverClientProfile {
    @GetMapping("/v1/nid/me")
    fun getProfile(@RequestHeader("Authorization") auth: String): NaverProfileResponse
}