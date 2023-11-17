package com.sideReview.side.controller

import com.sideReview.side.openSearch.OpenSearchGetService
import com.sideReview.side.tmdb.TmdbContentService
import com.sideReview.side.tmdb.dto.ContentDto
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class MainContentsController @Autowired constructor(
    private val tmdbContentService: TmdbContentService,
    private val openSearchGetService: OpenSearchGetService
) {

    @GetMapping("/contents")
    fun getContents(
        @RequestParam(defaultValue = "main") tab: String,
        @RequestParam sort: String
    ): List<ContentDto> {
        val content: List<ContentDto>
        runBlocking {
            content =
                openSearchGetService.parseToContent(openSearchGetService.get(tab, sort))
        }
        return content
    }

    @GetMapping("/init")
    fun getTmdb(): ResponseEntity<Any> {
        return ResponseEntity.ok(tmdbContentService.getMoreInfo(tmdbContentService.getAllContents()));
    }
}
