package com.sideReview.side.login

import com.sideReview.side.common.entity.UserInfo
import com.sideReview.side.common.util.MapperUtils
import org.slf4j.LoggerFactory
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
        val logger = LoggerFactory.getLogger(this::class.java)!!

        val principal = authentication.principal as CustomOAuth2User
        val userInfoDto =
            MapperUtils.mapUserInfoToLoginResponseDto(principal.attributes["user"] as UserInfo)
        logger.info("BABABA")
        logger.info("principal attribute uri : ${principal.attributes["uri"].toString()}")

        var targetUrl = request.getParameter("redirect_uri")

        logger.info("targetUrl-${targetUrl}")
        if (targetUrl.isNullOrBlank()) targetUrl =
            principal.attributes["uri"].toString().split("/api/")[0]
        logger.info("targetUrl-${targetUrl}")
//        val targetUrl = principal.attributes["uri"].toString().split("/api/")[0]


//        for (name in request.headerNames)
//            logger.info("${name}:${request.getHeader(name)}")


//        var targetUrl = request.getHeader("host")
//        if (targetUrl.contains("localhost")) targetUrl = "http://$targetUrl"
//        else targetUrl = "https://$targetUrl"
        val cookies: Array<Cookie>? = request.cookies
        var sessionId: String = ""

        cookies?.let {
            for (cookie in it) {
                if ("JSESSIONID" == cookie.name) {
                    // JSESSIONID 쿠키를 찾았습니다. 여기에서 원하는 작업을 수행합니다.
                    sessionId = cookie.value
                    logger.info("JSESSIONID: $sessionId")

                }
            }
        }

        val cookie = Cookie("JSESSIONID", sessionId)
        response.addCookie(cookie)
        response.addHeader("userId", userInfoDto.id)
//        response.sendRedirect("${targetUrl}/login/redirect?id=${sessionId}")
    }
}