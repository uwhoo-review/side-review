package com.sideReview.side.controller

import com.sideReview.side.tmdb.TmdbContentService
import com.sideReview.side.tmdb.TmdbPersonService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
@RestController
class TestController (
    private val tmdbContentService: TmdbContentService, private val tmdbPersonService: TmdbPersonService){
    @GetMapping("/init")
    fun getTmdb(): ResponseEntity<Any> {
        return ResponseEntity.ok(tmdbContentService.getMoreInfo(tmdbContentService.getAllContents()));
    }

    @GetMapping("/init/people")
    fun getPeople(): ResponseEntity<Any> {
        return ResponseEntity.ok(tmdbPersonService.getCreditInfo(tmdbPersonService.getAllPeople()));
    }
}