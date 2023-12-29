package com.sideReview.side.login.naver

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController("/login/naver")
class NaverLoginController(val client: NaverClient) {
    @PostMapping("")
    fun token(code: String, state: String): ResponseEntity<Any> {
        val auth = client.getAuth(code, state).access_token
        val profile = client.getProfile("Bearer $auth")
        return ResponseEntity.ok(profile.response)
    }
}