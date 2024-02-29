package com.sideReview.side.login.kakao

import com.sideReview.side.login.kakao.dto.KakaoAuthResponse
import com.sideReview.side.login.kakao.dto.KakaoProfileResponse
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestParam

//@Headers("Content-type: application/x-www-form-urlencoded")
@FeignClient(name = "kakaoProfile", url = "https://kapi.kakao.com")
interface KakaoClientProfile {
    @GetMapping("/v2/user/me")
    fun getProfile(@RequestHeader("Authorization") auth: String): KakaoProfileResponse

}