package com.sideReview.side.controller

import com.sideReview.side.openSearch.OpenSearchGetService
import com.sideReview.side.openSearch.dto.ContentRequestDTO
import com.sideReview.side.openSearch.dto.MainContentDto
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class MainContentsController @Autowired constructor(
    private val openSearchGetService: OpenSearchGetService
) {

    @PostMapping("/contents")
    fun getContents(
        @RequestParam(required = false) tab: String?,
        @RequestParam(required = false) sort: String?,
        @RequestBody request: ContentRequestDTO?
    ): ResponseEntity<Any> {
        var response: ResponseEntity<Any> = ResponseEntity(HttpStatus.BAD_REQUEST)
        if (tab.isNullOrBlank() && sort.isNullOrBlank()) return response
        runBlocking {

            when (tab) {
                "main" -> {
                    response = ResponseEntity.ok(
                        MainContentDto(
                            openSearchGetService.parseToContent(
                                openSearchGetService.get(tab, "popularity", request)
                            ),
                            openSearchGetService.parseToContent(
                                openSearchGetService.get(tab, "new", request)
                            )
                        )
                    )
                }

                "popularity" ->
                    response = ResponseEntity.ok(
                        openSearchGetService.parseToContent(
                            openSearchGetService.get(tab, "popularity", request)
                        )
                    )

                "new" ->
                    response = ResponseEntity.ok(
                        openSearchGetService.parseToContent(
                            openSearchGetService.get(tab, "new", request)
                        )
                    )
            }
            if (tab.isNullOrBlank() && !sort.isNullOrBlank()) {
                response = ResponseEntity.ok(
                    openSearchGetService.parseToContent(
                        openSearchGetService.get("sort", sort, request)
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
