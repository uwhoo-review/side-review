package com.sideReview.side.controller

import com.sideReview.side.openSearch.OpenSearchService
import com.sideReview.side.tmdb.TmdbContentService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class MainContentsController @Autowired constructor(
    private val tmdbContentService: TmdbContentService,
    private val openSearchService: OpenSearchService
) {

    @GetMapping("/contents")
    fun getContents(@RequestParam(defaultValue = "main") tab: String): ResponseEntity<Any> {
        //popular, latest
        return ResponseEntity.ok(tmdbContentService.getMainContents(tab));
    }

    @GetMapping("/init")
    fun getTmdb(): ResponseEntity<Any> {
        return ResponseEntity.ok(tmdbContentService.getMoreInfo(tmdbContentService.getAllContents()));
    }
}
