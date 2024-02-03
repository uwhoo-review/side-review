package com.sideReview.side.common.util

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
            return request.getHeader("userId")
        }

        fun getUserType(userId:String): String{
            if(userId.contains(".")) return "2"
            else return "1"
        }

        fun getUserType(request: HttpServletRequest): String {
            val userId = getUserId(request)
            return getUserType(userId)
        }
    }
}