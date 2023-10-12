package com.sideReview.side.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class TestController {
    @GetMapping
    fun getHello(): String {
        return "Hello World"
    }
}
