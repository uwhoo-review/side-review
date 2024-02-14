package com.sideReview.side.controller

import com.sideReview.side.login.LoginService
import com.sideReview.side.login.google.GoogleClientAuth
import com.sideReview.side.login.google.GoogleClientProfile
import com.sideReview.side.login.google.dto.GoogleRequest
import com.sideReview.side.login.kakao.KakaoClient
import com.sideReview.side.login.naver.NaverClientAuth
import com.sideReview.side.login.naver.NaverClientProfile
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@RestController
class LoginController(
    val googleClientProfile: GoogleClientProfile,
    val googleClientAuth: GoogleClientAuth,
    val naverClientAuth: NaverClientAuth,
    val naverClientProfile: NaverClientProfile,
    val kakaoClient: KakaoClient,
    val loginService: LoginService
) {

    @GetMapping("/login/naver")
    fun getNaverProfile(
        @RequestParam code: String,
        @RequestParam state: String,
        request: HttpServletRequest,
        response: HttpServletResponse

    ): ResponseEntity<String> {
        val auth = naverClientAuth.getAuth(code, state).access_token
        val profile = naverClientProfile.getProfile("Bearer $auth")
        val saveUser = loginService.saveUser("naver", profile)
        return loginService.createOrUpdateSession(saveUser, request, response)
    }

    @GetMapping("/login/google")
    fun getGoogleProfile(
        @RequestParam code: String,
        @RequestParam uri: String,
        request: HttpServletRequest,
        response: HttpServletResponse
    ): ResponseEntity<String> {
        val auth = googleClientAuth.getAuth(
            GoogleRequest(
                code = code, redirect_uri = uri
            )
        )
        val profile = googleClientProfile.getProfile(auth.access_token)
        val saveUser = loginService.saveUser("google", profile)
        return loginService.createOrUpdateSession(saveUser, request, response)
    }

    @GetMapping("/login/kakao")
    fun getKakaoProfile(
        @RequestParam code: String,
        @RequestParam uri: String,
        request: HttpServletRequest,
        response: HttpServletResponse

    ): ResponseEntity<String> {
        val auth = kakaoClient.getAuth(uri, code)
        val profile = kakaoClient.getProfile(
            "${auth.token_type} ${auth.access_token}"
        )
        val saveUser = loginService.saveUser("kakao", profile)
        return loginService.createOrUpdateSession(saveUser, request, response)
    }

}
