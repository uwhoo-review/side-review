package com.sideReview.side.controller

import com.sideReview.side.common.dto.UserInfoDto
import com.sideReview.side.login.LoginService
import com.sideReview.side.login.LoginToggleUserIdInvalidException
import com.sideReview.side.login.LoginUser
import com.sideReview.side.login.google.GoogleClientAuth
import com.sideReview.side.login.google.GoogleClientProfile
import com.sideReview.side.login.google.dto.GoogleRequest
import com.sideReview.side.login.kakao.KakaoClientAuth
import com.sideReview.side.login.kakao.KakaoClientProfile
import com.sideReview.side.login.naver.NaverClientAuth
import com.sideReview.side.login.naver.NaverClientProfile
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.session.web.http.DefaultCookieSerializer
import org.springframework.web.bind.annotation.*
import java.net.URI
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@RestController
class LoginController(
    val googleClientProfile: GoogleClientProfile,
    val googleClientAuth: GoogleClientAuth,
//    val googleClientLogout: GoogleClientAuthRevoke,
    val naverClientAuth: NaverClientAuth,
    val naverClientProfile: NaverClientProfile,
    val kakaoClientAuth: KakaoClientAuth,
    val kakaoClientProfile: KakaoClientProfile,
    val loginService: LoginService,
    private val cookieSerializer: DefaultCookieSerializer
) {
    val logger = LoggerFactory.getLogger(this::class.java)!!

    @GetMapping("/login/naver")
    fun getNaverProfile(
        @RequestParam code: String,
        @RequestParam state: String,
        request: HttpServletRequest,
        response: HttpServletResponse

    ): ResponseEntity<String> {
        val auth = naverClientAuth.getAuth(code, state).access_token
        val profile = naverClientProfile.getProfile("Bearer $auth")

//        val logger = LoggerFactory.getLogger(this::class.java)!!
//        logger.info(profile.toString())
        val saveUser = loginService.saveUser("naver", profile)
        return loginService.createOrUpdateSession(saveUser, request, response, auth)
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
        return loginService.createOrUpdateSession(saveUser, request, response, auth.access_token)
    }

    @GetMapping("/login/kakao")
    fun getKakaoProfile(
        @RequestParam code: String,
        @RequestParam uri: String,
        request: HttpServletRequest,
        response: HttpServletResponse

    ): ResponseEntity<String> {
        val auth = kakaoClientAuth.getAuth(uri, code)
        val profile = kakaoClientProfile.getProfile(
            "${auth.token_type} ${auth.access_token}"
        )
        val saveUser = loginService.saveUser("kakao", profile)
        return loginService.createOrUpdateSession(saveUser, request, response, auth.access_token)
    }

    @GetMapping("/logout")
    fun logout(
        request: HttpServletRequest,
        response: HttpServletResponse,
        @RequestParam type: String,
        @RequestParam(required = false) redirectUrl: String
    ): Any {

        try {
            val logger = LoggerFactory.getLogger(this::class.java)!!
            logger.info("######## /logout api ############")
            // 세션 삭제
            request.getSession(false)?.invalidate()

            // 기존 쿠키 삭제
            val cookieNames = arrayOf("JSESSIONID") // 여러 쿠키 이름이 있다면 추가
            for (cookieName in cookieNames) {
                val cookie = Cookie(cookieName, null)
                cookie.path = "/"
                cookie.maxAge = 0
                cookie.secure = true
                cookie.isHttpOnly = true
                cookieSerializer.setSameSite("None")
                response.addCookie(cookie)
            }
            // 사용자 인증 정보 삭제
            SecurityContextHolder.clearContext()
        } catch (e: Exception) {
            return ResponseEntity.internalServerError().body(e.message)
        }

        // 각 타입 별 토큰 만료
        if (type == "kakao") {
            val uri =
                URI.create("https://kauth.kakao.com/oauth/logout?client_id=5226f263acf8306b81d4c11afbb2afc2&logout_redirect_uri=${redirectUrl}")
            return ResponseEntity.status(HttpStatus.PERMANENT_REDIRECT).location(uri)
        }
        return ResponseEntity.ok("logout success")
    }

    @PutMapping("/user/ott/{toggle}")
    fun changeToggle(
        @PathVariable toggle: Boolean,
        @LoginUser user: UserInfoDto
    ): ResponseEntity<String> {
        try {
            loginService.changeToggle(user, toggle)
        } catch (e: Exception) {
            when (e) {
                is LoginToggleUserIdInvalidException ->
                    return ResponseEntity.badRequest().body(e.message)
            }
        }
        return ResponseEntity.ok()
            .body("user param changed : toggle ${if (toggle) "on" else "off"}")
    }
}
