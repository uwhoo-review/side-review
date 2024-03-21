package com.sideReview.side.common.util

import com.sideReview.side.common.dto.UserInfoDto
import org.slf4j.LoggerFactory
import javax.servlet.http.HttpServletRequest

class ClientUtils {
    companion object {
        fun getIp(request: HttpServletRequest): String {
            val logger = LoggerFactory.getLogger(this::class.java)!!

            var ip = request.getHeader("X-FORWARDED-FOR")

            //proxy 환경일 경우
            if (ip.isNullOrBlank()) {
                ip = request.getHeader("Proxy-Client-IP")
            }

            //웹로직 서버일 경우
            if (ip.isNullOrBlank()) {
                ip = request.getHeader("WL-Proxy-Client-IP")
            }

            if (ip.isNullOrBlank()) {
                ip = request.remoteAddr
            }

//            val regex = """[^\d.](?:.*)""".toRegex()
//            return ip.replace(regex, "")
            return ip
        }

        fun getUserId(request: HttpServletRequest): String {
            return if (request.getHeader("userId") != null) {
                request.getHeader("userId")
            } else {
                getIp(request)
            }
        }

        fun getUserId(request: HttpServletRequest, user: UserInfoDto?): String {
            return user?.id ?: getUserId(request)
        }

        fun getUserType(userId: String): String {
            //1:로그인 유저, 2:public
            return if (userId.contains(".") || userId.contains(":")) "2"
            else "1"
        }

        fun getUserType(request: HttpServletRequest): String {
            val userId = getUserId(request)
            return getUserType(userId)
        }

        fun getUserType(request: HttpServletRequest, user: UserInfoDto?): String {
            return if (user != null) "1"
            else getUserType(request)
        }
    }
}