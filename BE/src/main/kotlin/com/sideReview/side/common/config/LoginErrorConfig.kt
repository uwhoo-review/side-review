package com.sideReview.side.common.config

import feign.FeignException
import io.ktor.utils.io.errors.*
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import javax.servlet.http.HttpServletResponse


@RestControllerAdvice
class LoginErrorConfig {
    private val logger = LoggerFactory.getLogger(this.javaClass)!!

    @ExceptionHandler(FeignException::class)
    fun handleFeignStatusException(e: FeignException, response: HttpServletResponse): Exception {
        return Exception(e)
    }
}