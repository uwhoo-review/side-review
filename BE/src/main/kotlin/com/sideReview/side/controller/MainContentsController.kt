package com.sideReview.side.controller

import com.sideReview.side.tmdb.TmdbContentService
import com.sideReview.side.tmdb.TmdbPersonService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class MainContentsController @Autowired constructor(
    private val tmdbContentService: TmdbContentService, private val tmdbPersonService: TmdbPersonService){
    @GetMapping("/api/todo")
    fun getHello(): String {
        return "Hello World"
    }
    @GetMapping("/contents")
    fun getContents(@RequestParam(defaultValue = "main") tab : String): ResponseEntity<Any> {
        //popular, latest
        return ResponseEntity.ok(tmdbContentService.getMainContents(tab));
    }

    @GetMapping("/init")
    fun getTmdb(): ResponseEntity<Any> {
        return ResponseEntity.ok(tmdbContentService.getMoreInfo(tmdbContentService.getAllContents()));
    }

    @GetMapping("/init/people")
    fun getPeople(): ResponseEntity<Any> {
        return ResponseEntity.ok(tmdbPersonService.getAllPeople());
    }
}
