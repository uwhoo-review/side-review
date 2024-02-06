package com.sideReview.side.config

import com.sideReview.side.login.Oauth2UserServiceImpl
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
@EnableWebSecurity
open class SecurityConfig(val oauth2UserService: Oauth2UserServiceImpl) {
    @Bean
    open fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()

        configuration.allowedOriginPatterns = listOf(
            "https://uwhoo-review.site",
            "https://localhost",
            "https://www.uwhoo-review.site",
            "https://feature-frontend-main.d21476p4w1wok.amplifyapp.com"
        )
        configuration.allowedOrigins = listOf(
            "https://uwhoo-review.site",
            "https://localhost",
            "https://www.uwhoo-review.site",
            "https://feature-frontend-main.d21476p4w1wok.amplifyapp.com"
        )

        configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS")

        configuration.allowCredentials = true
        configuration.addAllowedHeader("*")

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }

    @Bean
    open fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf().disable()
            .authorizeRequests()
            .antMatchers("/user/**").authenticated()
            .anyRequest().permitAll()
            .and()
            .cors()

            .and()
            .oauth2Login()
            .defaultSuccessUrl("/")
            .userInfoEndpoint()
            .userService(oauth2UserService)
        return http.build()
    }
}
