package com.sideReview.side.login.google

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam

@FeignClient(name = "googleAuthRevoke", url = "https://accounts.google.com/o/oauth2")

interface GoogleClientAuthRevoke {
    @PostMapping("/revoke")
    fun revokeToken(@RequestParam("token") token: String)
}