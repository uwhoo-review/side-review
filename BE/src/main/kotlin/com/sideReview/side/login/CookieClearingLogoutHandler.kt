package com.sideReview.side.login

import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.logout.LogoutHandler
import org.springframework.stereotype.Component
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class CookieClearingHandler() : LogoutHandler {
    override fun logout(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authentication: Authentication?
    ) {
        // 쿠키 삭제
        // 여기서 쿠키를 설정하거나 다룰 수 있음
        val cookie = Cookie("JSESSIONID", null)
        cookie.path = "/"
        cookie.maxAge = 0
        cookie.secure = true
        cookie.isHttpOnly = true
        response.addCookie(cookie)
    }
}