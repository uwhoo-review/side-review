package com.sideReview.side.login.naver

import com.sideReview.side.login.naver.dto.NaverAuthResponse
import com.sideReview.side.login.naver.dto.NaverProfileResponse
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestParam

@FeignClient(name = "naver")
interface NaverClient {
    @GetMapping("https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${Const.CLIENT_ID}&client_secret=${Const.CLIENT_SECRET}")
    fun getAuth(@RequestParam code: String, @RequestParam state: String): NaverAuthResponse

    @GetMapping("https://openapi.naver.com/v1/nid/me")
    fun getProfile(@RequestHeader("Authorization") auth: String): NaverProfileResponse
}

private class Const {
    companion object {
        const val CLIENT_ID: String = "8B0WOI_5YTPZcSr_9haJ"
        const val CLIENT_SECRET: String = "eo89L4YJJw"
    }
}