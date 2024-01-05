package com.sideReview.side.controller

import com.sideReview.side.login.google.GoogleClient
import com.sideReview.side.login.google.dto.GoogleProfileResponse
import com.sideReview.side.login.google.dto.GoogleRequest
import com.sideReview.side.login.kakao.KakaoClient
import com.sideReview.side.login.kakao.dto.KakaoProfileResponse
import com.sideReview.side.login.naver.NaverClient
import com.sideReview.side.login.naver.dto.NaverProfileDetail
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/login")
class LoginController(
    val googleClient: GoogleClient,
    val naverClient: NaverClient,
    val kakaoClient: KakaoClient
) {
    @GetMapping("/naver")
    fun getNaverProfile(
        @RequestParam code: String,
        @RequestParam state: String
    ): ResponseEntity<NaverProfileDetail> {
        val auth = naverClient.getAuth(code, state).access_token
        val profile = naverClient.getProfile("Bearer $auth")
        return ResponseEntity.ok(profile.response)
    }

    @GetMapping("/google")
    fun getGoogleProfile(
        @RequestParam code: String,
        @RequestParam uri: String
    ): ResponseEntity<GoogleProfileResponse> {
        val auth = googleClient.getAuth(
            GoogleRequest(
                code = code, redirect_uri = uri
            )
        )
        val profile = googleClient.getProfile(auth.access_token)
        return ResponseEntity.ok(profile)
    }

    @GetMapping("/kakao")
    fun getKakaoProfile(
        @RequestParam code: String,
        @RequestParam uri: String
    ): ResponseEntity<KakaoProfileResponse> {
        val auth = kakaoClient.getAuth(uri, code)
        val profile = kakaoClient.getProfile(
            "${auth.token_type} ${auth.access_token}"
        )
        return ResponseEntity.ok(profile)
    }
}
