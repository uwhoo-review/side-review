package com.sideReview.side.common.config

import feign.FeignException
import io.ktor.utils.io.errors.*
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import javax.servlet.http.HttpServletResponse


@RestControllerAdvice
class LoginErrorConfig {

    @ExceptionHandler(FeignException::class)
    fun handleFeignStatusException(e: FeignException, response: HttpServletResponse): Exception {
        e.printStackTrace()
        return Exception(e)
    }
}