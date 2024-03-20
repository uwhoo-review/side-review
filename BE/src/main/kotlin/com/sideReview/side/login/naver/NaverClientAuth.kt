package com.sideReview.side.login.naver

import com.sideReview.side.login.naver.dto.NaverAuthResponse
import com.sideReview.side.login.naver.dto.NaverLogoutResponse
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam

@FeignClient(name = "naverAuth", url = "https://nid.naver.com")
interface NaverClientAuth {
    @GetMapping("/oauth2.0/token?grant_type=authorization_code&client_id=${Const.CLIENT_ID}&client_secret=${Const.CLIENT_SECRET}")
    fun getAuth(@RequestParam code: String, @RequestParam state: String): NaverAuthResponse
}

private class Const {
    companion object {
        const val CLIENT_ID: String = "8B0WOI_5YTPZcSr_9haJ"
        const val CLIENT_SECRET: String = "eo89L4YJJw"
    }
}