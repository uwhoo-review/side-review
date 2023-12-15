package com.sideReview.side.review

import org.slf4j.LoggerFactory
import javax.servlet.http.HttpServletRequest

class ClientUtils {
    companion object {
        fun getIp(request: HttpServletRequest): String {
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

            val logger = LoggerFactory.getLogger(this.javaClass)!!
            logger.error("************** review 추가 ip log ***************")
            logger.error(ip)
            return ip
        }
    }
}