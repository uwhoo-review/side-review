package com.sideReview.side.controller

import com.sideReview.side.common.entity.UserInfo
import com.sideReview.side.login.LoginService
import com.sideReview.side.login.google.GoogleClientAuth
import com.sideReview.side.login.google.GoogleClientProfile
import com.sideReview.side.login.google.dto.GoogleProfileResponse
import com.sideReview.side.login.google.dto.GoogleRequest
import com.sideReview.side.login.kakao.KakaoClient
import com.sideReview.side.login.kakao.dto.KakaoProfileResponse
import com.sideReview.side.login.naver.NaverClientAuth
import com.sideReview.side.login.naver.NaverClientProfile
import com.sideReview.side.login.naver.dto.NaverProfileDetail
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/login")
class LoginController(
    val googleClientProfile: GoogleClientProfile,
    val googleClientAuth: GoogleClientAuth,
    val naverClientAuth: NaverClientAuth,
    val naverClientProfile: NaverClientProfile,
    val kakaoClient: KakaoClient,
    val loginService: LoginService
) {
    @GetMapping("/test")
    fun testLogin(
        userInfo: OAuth2User
    ): String? { //세션 정보 받아오기 (DI 의존성 주입)

        //방법 1
        println("/test/login =============================")

        //방법 2
        println("userDetails:" + userInfo.attributes["userInfo"])
        return "세션 정보 확인"
    }

    @GetMapping("/naver")
    fun getNaverProfile(
        @RequestParam code: String,
        @RequestParam state: String
    ): ResponseEntity<NaverProfileDetail> {
        val auth = naverClientAuth.getAuth(code, state).access_token
        val profile = naverClientProfile.getProfile("Bearer $auth")
        loginService.saveUser("naver", profile)
        return ResponseEntity.ok(profile.response)
    }

    @GetMapping("/google")
    fun getGoogleProfile(
        @RequestParam code: String,
        @RequestParam uri: String
    ): ResponseEntity<GoogleProfileResponse> {
        val auth = googleClientAuth.getAuth(
            GoogleRequest(
                code = code, redirect_uri = uri
            )
        )
        val profile = googleClientProfile.getProfile(auth.access_token)
        loginService.saveUser("google", profile)
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
        loginService.saveUser("kakao", profile)
        return ResponseEntity.ok(profile)
    }
}
