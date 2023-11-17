package com.sideReview.side.controller

import com.sideReview.side.openSearch.OpenSearchGetService
import com.sideReview.side.openSearch.dto.MainContentDto
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
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
        @RequestParam(required = false) tab: String?,
        @RequestParam(required = false) sort: String?
    ): ResponseEntity<Any> {
        var response: ResponseEntity<Any> = ResponseEntity(HttpStatus.BAD_REQUEST)
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
            }
            if (tab.isNullOrBlank() && !sort.isNullOrBlank()) {
                response = ResponseEntity.ok(
                    openSearchGetService.parseToContent(
                        openSearchGetService.get("sort", sort)
                    )
                )
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
