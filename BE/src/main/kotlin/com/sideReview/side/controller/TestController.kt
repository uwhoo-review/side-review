package com.sideReview.side.controller

import com.sideReview.side.login.NicknameService
import com.sideReview.side.tmdb.TmdbContentService
import com.sideReview.side.tmdb.TmdbPersonService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class TestController(
    private val tmdbContentService: TmdbContentService,
    private val tmdbPersonService: TmdbPersonService,
    private val nicknameService: NicknameService
) {
    @GetMapping("/init")
    fun getTmdb(): ResponseEntity<Any> {
        return ResponseEntity.ok(tmdbContentService.getMoreInfo(tmdbContentService.getAllContents()))
    }

    @GetMapping("/init/person")
    fun getPeople(): ResponseEntity<Any> {
        return ResponseEntity.ok(
            tmdbContentService.getMoreInfo(
                tmdbContentService.getAllContentsFromPerson(
                    tmdbPersonService.getAllPeople()
                )
            )
        )
    }

    @GetMapping("/test")
    fun getTest(): ResponseEntity<Any> {
        return ResponseEntity.ok(nicknameService.makeNickname(0))
    }
}