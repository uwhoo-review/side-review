package com.sideReview.side.login

import com.sideReview.side.common.entity.UserInfo
import com.sideReview.side.common.util.MapperUtils
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import org.springframework.stereotype.Component
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class AuthSuccessHandler : AuthenticationSuccessHandler {
    override fun onAuthenticationSuccess(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authentication: Authentication
    ) {
        val principal = authentication.principal as CustomOAuth2User
        val userInfoDto =
            MapperUtils.mapUserInfoToLoginResponseDto(principal.attributes["user"] as UserInfo)
//        val targetUrl = request.requestURL.split("/api/login/")[0]
        var targetUrl = request.getHeader("host")
        if (targetUrl.contains("localhost")) targetUrl = "http://$targetUrl"
        else targetUrl = "https://$targetUrl"
        val cookies: Array<Cookie>? = request.cookies
        var sessionId: String = ""
        cookies?.let {
            for (cookie in it) {
                if ("JSESSIONID" == cookie.name) {
                    // JSESSIONID 쿠키를 찾았습니다. 여기에서 원하는 작업을 수행합니다.
                    sessionId = cookie.value
                    println("JSESSIONID: $sessionId")

                }
            }
        }
        println(request.headerNames)
        for (name in request.headerNames)
            println("${name}:${request.getHeader(name)}")
        val cookie = Cookie("JSESSIONID", sessionId)
        response.addCookie(cookie)
        response.addHeader("userId", userInfoDto.id)
        response.sendRedirect("${targetUrl}/login/redirect?id=${sessionId}")
    }
}