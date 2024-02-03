package com.sideReview.side.common.filter

import lombok.ToString
import java.util.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletRequestWrapper
import kotlin.collections.HashSet

@ToString
class CustomHttpServletRequest(request: HttpServletRequest) : HttpServletRequestWrapper(request) {
    private val customHeaders: MutableMap<String, String> = mutableMapOf();
    fun putHeader(name: String, value: String?) {
        customHeaders[name] = value!!
    }

    override fun getHeader(name: String): String? {
        val headerValue = customHeaders[name]
        return headerValue ?: (request as HttpServletRequest).getHeader(name)
    }

    override fun getHeaderNames(): Enumeration<String> {
        val set: MutableSet<String> = HashSet(customHeaders.keys)
        val e: Enumeration<String> = (request as HttpServletRequest).headerNames
        while (e.hasMoreElements()) {
            val n: String = e.nextElement()
            set.add(n)
        }
        return Collections.enumeration(set)
    }
}