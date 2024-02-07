package com.sideReview.side.login

import com.fasterxml.jackson.databind.ObjectMapper
import com.sideReview.side.common.entity.UserInfo
import com.sideReview.side.common.util.MapperUtils
import org.springframework.http.MediaType
import org.springframework.security.core.Authentication
import org.springframework.security.web.DefaultRedirectStrategy
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import org.springframework.stereotype.Component
import java.io.PrintWriter
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
        response.addHeader("userId", userInfoDto.id)
        response.sendRedirect("https://www.uwhoo-review.site/login/redirect")
    }
}