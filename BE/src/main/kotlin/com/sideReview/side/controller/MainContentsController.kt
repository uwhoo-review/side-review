package com.sideReview.side.controller

import com.sideReview.side.tmdb.TMDBService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class MainContentsController @Autowired constructor(private val tmdbService: TMDBService){
    @GetMapping("/api/todo")
    fun getHello(): String {
        return "Hello World"
    }
    @GetMapping("/contents")
    fun getContents(@RequestParam(defaultValue = "main") tab : String): ResponseEntity<Any> {
        //popular, latest
        return ResponseEntity.ok(tmdbService.getMainContents(tab));
    }

    @GetMapping("/init")
    fun getTmdb(): ResponseEntity<Any> {
        //popular, latest
        return ResponseEntity.ok(tmdbService.putSearchServer());
    }
}
