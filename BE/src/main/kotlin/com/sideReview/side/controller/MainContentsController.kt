package com.sideReview.side.controller

import com.sideReview.side.openSearch.OpenSearchGetService
import com.sideReview.side.openSearch.dto.MainContentDto
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class MainContentsController @Autowired constructor(
    private val openSearchGetService: OpenSearchGetService
) {

    @GetMapping("/contents")
    suspend fun getContents(
        @RequestParam(defaultValue = "main") tab: String,
        @RequestParam sort: String
    ): Any {
        when (tab) {
            "main" -> {
                return MainContentDto(
                    openSearchGetService.parseToContent(
                        openSearchGetService.get(tab, "popularity")
                    ),
                    openSearchGetService.parseToContent(
                        openSearchGetService.get(tab, "new")
                    )
                )
            }

            "popularity" ->
                return openSearchGetService.parseToContent(
                    openSearchGetService.get(tab, "popularity")
                )


            "new" ->
                return openSearchGetService.parseToContent(
                    openSearchGetService.get(tab, "new")
                )

            else -> return ResponseEntity.badRequest()
        }
    }
//
//    @GetMapping("/init")
//    fun getTmdb(): ResponseEntity<Any> {
//        return ResponseEntity.ok(tmdbContentService.getMoreInfo(tmdbContentService.getAllContents()));
//    }
}
