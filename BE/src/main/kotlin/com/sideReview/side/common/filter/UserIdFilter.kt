package com.sideReview.side.common.filter

import com.sideReview.side.common.dto.UserInfoDto
import com.sideReview.side.common.repository.UserInfoRepository
import com.sideReview.side.common.util.ClientUtils
import com.sideReview.side.login.LoginService
import org.slf4j.LoggerFactory
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import javax.servlet.Filter
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
class UserIdFilter(private val loginService: LoginService) : Filter {
    override fun doFilter(
        request: ServletRequest,
        response: ServletResponse,
        filterChain: FilterChain
    ) {
        val logger = LoggerFactory.getLogger(this::class.java)!!
//
        val mutableRequest = CustomHttpServletRequest(request as HttpServletRequest)
//        kotlin.runCatching {
//            val sessionUser = mutableRequest.session.getAttribute("user") as? UserInfoDto
//            val authentication = SecurityContextHolder.getContext().authentication
//            if (authentication != null && authentication.isAuthenticated && sessionUser != null) {
//                // 세션이 있으면 로그인 유저
//                // userInfo와 정보가 일치하지 않는다면 auth error 리턴
//                if (!loginService.authenticateUser(sessionUser.id, sessionUser.type)) {
//                    (response as HttpServletResponse).status = HttpServletResponse.SC_UNAUTHORIZED
//                    response.writer.write("Authentication failed. Session exist, but no User Info.")
//                    return
//                }
//            } else if (mutableRequest.getHeader("userId").isNullOrBlank()) {
//                // 세션이 없는 퍼블릭 유저
//                mutableRequest.putHeader("userId", ClientUtils.getIp(request))
//            }
//
//        }.onFailure {
//            logger.error("Filter Error :: user Id : ${mutableRequest.getHeader("userId")}")
//        }
        filterChain.doFilter(mutableRequest, response);
    }

}