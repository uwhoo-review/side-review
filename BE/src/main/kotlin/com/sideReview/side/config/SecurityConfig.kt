package com.sideReview.side.config

import com.sideReview.side.login.CookieClearingHandler
import com.sideReview.side.login.LogoutSuccessHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.core.session.SessionRegistry
import org.springframework.security.core.session.SessionRegistryImpl
import org.springframework.security.web.SecurityFilterChain
import org.springframework.session.web.http.CookieSerializer
import org.springframework.session.web.http.DefaultCookieSerializer
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource


@Configuration
@EnableWebSecurity
open class SecurityConfig(
//    val oauth2UserService: Oauth2UserServiceImpl,
//    val authSuccessHandler: AuthSuccessHandler,
//    val authFailHandler: AuthFailHandler,
    val logoutSuccessHandler: LogoutSuccessHandler,
    val cookieClearingLogoutHandler: CookieClearingHandler
) {
    @Bean
    open fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()

        configuration.allowedOriginPatterns = listOf(
            "https://uwhoo-review.site",
            "https://localhost:3000",
            "https://www.uwhoo-review.site",
        )
        configuration.allowedOrigins = listOf(
            "https://uwhoo-review.site",
            "https://localhost:3000",
            "https://www.uwhoo-review.site",
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
            .cors()
            .and()
            .formLogin().disable()
            .authorizeRequests()
            .antMatchers(HttpMethod.OPTIONS, "/**").permitAll() // pre-flight 요청 허용
            .antMatchers("/user**").authenticated()
            .antMatchers(HttpMethod.DELETE, "/star/**").authenticated()
            .antMatchers(HttpMethod.PUT, "/star/**").authenticated()
//            .access("isAuthenticated() or permitAll()")
            .anyRequest().permitAll()

//            .and()
//            .oauth2Login()
//            .userInfoEndpoint()
//            .userService(oauth2UserService)
//            .and()
//            .successHandler(authSuccessHandler)
//            .failureHandler(authFailHandler)
            .and()
            .logout()
            .logoutUrl("/logout")
            .invalidateHttpSession(true)
            .clearAuthentication(true)
            .addLogoutHandler(cookieClearingLogoutHandler) // 쿠키를 삭제하는 핸들러 추가
//            .logoutSuccessUrl("/login/redirect")
            .logoutSuccessHandler(logoutSuccessHandler)
//            .permitAll()
//            .and().sessionManagement()
//            .sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
        return http.build()
    }

    @Bean
    fun sessionRegistry(): SessionRegistry? {
        return SessionRegistryImpl()
    }
}
