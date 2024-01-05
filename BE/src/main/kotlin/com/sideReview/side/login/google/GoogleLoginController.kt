package com.sideReview.side.login.google

import com.sideReview.side.login.google.dto.GoogleProfileResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController("/login/google")
class GoogleLoginController(val client: GoogleClient) {

    fun token(code: String): ResponseEntity<GoogleProfileResponse> {
        val profile = client.getProfile(code)
        return ResponseEntity.ok(profile)
    }
}