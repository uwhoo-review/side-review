package com.sideReview.side.common.filter

import com.sideReview.side.common.util.ClientUtils
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import javax.servlet.Filter
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest

@Component
class UserIdFilter : Filter {
    override fun doFilter(
        request: ServletRequest,
        response: ServletResponse,
        filterChain: FilterChain
    ) {
        kotlin.runCatching {
            val mutableRequest = CustomHttpServletRequest(request as HttpServletRequest)
            if (mutableRequest.getHeader("userId").isNullOrBlank())
                mutableRequest.putHeader("userId", ClientUtils.getIp(request))

            filterChain.doFilter(mutableRequest, response);
        }.onFailure {
            val logger = LoggerFactory.getLogger(this::class.java)!!
            logger.error("UserIdFilter :: check header failed")
            logger.error(it.stackTraceToString())
        }
    }

}