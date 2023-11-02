package com.sideReview.side.controller

import com.sideReview.side.tmdb.TMDBService
import com.sideReview.side.tmdb.dto.TMDBResponse
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class TestController @Autowired constructor(private val tmdbService: TMDBService){
    @GetMapping("/api/todo")
    fun getHello(): String {
        return "Hello World"
    }
    @GetMapping("/init")
    fun getTvShows(): TMDBResponse {
        return tmdbService.putSearchServer()
    }
}
