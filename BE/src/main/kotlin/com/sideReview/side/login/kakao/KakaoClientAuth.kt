package com.sideReview.side.login.kakao

import com.sideReview.side.login.kakao.dto.KakaoAuthResponse
import com.sideReview.side.login.kakao.dto.KakaoProfileResponse
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestParam

//@Headers("Content-type: application/x-www-form-urlencoded")
@FeignClient(name = "kakao", url = "https://kauth.kakao.com")
interface KakaoClientAuth {

    @PostMapping("/oauth/token?client_id=${Const.CLIENT_ID}&grant_type=authorization_code")
    fun getAuth(
        @RequestParam("redirect_uri") redirectUri: String,
        @RequestParam("code") authorizationCode: String,
    ): KakaoAuthResponse
}


private class Const {
    companion object {
        const val CLIENT_ID: String = "5226f263acf8306b81d4c11afbb2afc2"
    }
}