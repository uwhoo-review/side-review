package com.sideReview.side.common.filter

import com.sideReview.side.common.util.ClientUtils
import org.slf4j.LoggerFactory
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import javax.servlet.Filter
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
class UserIdFilter : Filter {
    override fun doFilter(
        request: ServletRequest,
        response: ServletResponse,
        filterChain: FilterChain
    ) {
        val logger = LoggerFactory.getLogger(this::class.java)!!

        val mutableRequest = CustomHttpServletRequest(request as HttpServletRequest)
        kotlin.runCatching {
            if (mutableRequest.getHeader("userId").isNullOrBlank()) {
                mutableRequest.putHeader("userId", ClientUtils.getIp(request))
            }
            filterChain.doFilter(mutableRequest, response);
        }.onFailure {
            logger.error("user Id : ${mutableRequest.getHeader("userId")}")
        }
    }

}