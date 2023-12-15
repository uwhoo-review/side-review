package com.sideReview.side.review

import org.slf4j.LoggerFactory
import javax.servlet.http.HttpServletRequest

class ClientUtils {
    companion object {
        fun getIp(request: HttpServletRequest): String {
            val logger = LoggerFactory.getLogger(this.javaClass)!!

            var ip = request.getHeader("X-FORWARDED-FOR")
            logger.info("X-FORWARDED-FOR : $ip")
            //proxy 환경일 경우
            if (ip.isNullOrBlank()) {
                ip = request.getHeader("Proxy-Client-IP")
            }
            logger.info("Proxy-Client-IP: $ip")

            //웹로직 서버일 경우
            if (ip.isNullOrBlank()) {
                ip = request.getHeader("WL-Proxy-Client-IP")
            }
            logger.info("WL-Proxy-Client-IP: $ip")


            if (ip.isNullOrBlank()) {
                ip = request.remoteAddr
            }
            logger.info("remoteAddr: $ip")

            logger.error("************** review 추가 ip log ***************")
            logger.error(ip)
            return ip
        }
    }
}