package com.sideReview.side.config

import com.sideReview.side.login.LoginUserArgumentResolver
import lombok.RequiredArgsConstructor
import org.springframework.context.annotation.Configuration
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@RequiredArgsConstructor
@Configuration
class WebConfig(private val loginUserArgumentResolver: LoginUserArgumentResolver) :
    WebMvcConfigurer {

    override fun addArgumentResolvers(argumentResolvers: MutableList<HandlerMethodArgumentResolver>) {
        argumentResolvers.add(loginUserArgumentResolver)
    }
}