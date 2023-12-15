package com.sideReview.side.review

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

            System.err.println("************** review 추가 ip log ***************")
            System.err.println(ip)
            return ip
        }
    }
}