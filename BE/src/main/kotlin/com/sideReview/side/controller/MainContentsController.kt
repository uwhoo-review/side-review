package com.sideReview.side.controller

import com.sideReview.side.openSearch.OpenSearchGetService
import com.sideReview.side.openSearch.dto.MainContentDto
import kotlinx.coroutines.runBlocking
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
    fun getContents(
        @RequestParam(defaultValue = "main") tab: String,
        @RequestParam(required = false) sort: String?
    ): ResponseEntity<Any> {
        val response: ResponseEntity<Any>;
        runBlocking {

            when (tab) {
                "main" -> {
                    response = ResponseEntity.ok(
                        MainContentDto(
                            openSearchGetService.parseToContent(
                                openSearchGetService.get(tab, "popularity")
                            ),
                            openSearchGetService.parseToContent(
                                openSearchGetService.get(tab, "new")
                            )
                        )
                    )
                }

                "popularity" ->
                    response = ResponseEntity.ok(
                        openSearchGetService.parseToContent(
                            openSearchGetService.get(tab, "popularity")
                        )
                    )


                "new" ->
                    response = ResponseEntity.ok(
                        openSearchGetService.parseToContent(
                            openSearchGetService.get(tab, "new")
                        )
                    )

                else -> response = ResponseEntity.ok("null")
            }
        }
        return response
    }
//
//    @GetMapping("/init")
//    fun getTmdb(): ResponseEntity<Any> {
//        return ResponseEntity.ok(tmdbContentService.getMoreInfo(tmdbContentService.getAllContents()));
//    }
}
