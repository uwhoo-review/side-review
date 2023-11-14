package com.sideReview.side.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
@EnableWebSecurity
class SecurityConfig : WebSecurityConfigurerAdapter() {
    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = listOf("https://uwhoo-review.site", "https://localhost",
            "https://www.uwhoo-review.site", "https://feature-frontend-main.d21476p4w1wok.amplifyapp.com") // 허용하려는 도메인을 추가
        configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS")
        configuration.allowCredentials = true
        configuration.addAllowedHeader("*")

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("**", configuration)
        return source
    }
    override fun configure(http: HttpSecurity) {
        http
            .authorizeRequests()
            .antMatchers("**").permitAll()
            .anyRequest().authenticated()
            .and()
            .csrf().disable()
    }
}