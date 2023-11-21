package com.sideReview.side.controller

import com.sideReview.side.openSearch.OpenSearchGetService
import com.sideReview.side.openSearch.dto.ContentRequestDTO
import com.sideReview.side.openSearch.dto.MainContentDto
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class MainContentsController @Autowired constructor(
    private val openSearchGetService: OpenSearchGetService
) {

    @PostMapping("/contents")
    fun getContents(
        @RequestBody request: ContentRequestDTO
    ): ResponseEntity<Any> {
        var response: ResponseEntity<Any> = ResponseEntity(HttpStatus.BAD_REQUEST)
        runBlocking {
            when (request.tab) {
                "main" -> {
                    response = ResponseEntity.ok(
                        MainContentDto(
                            openSearchGetService.parseToContent(
                                openSearchGetService.get(request.tab, "popularity", request)
                            ),
                            openSearchGetService.parseToContent(
                                openSearchGetService.get(request.tab, "new", request)
                            )
                        )
                    )
                }

                "popularity" -> {
                    response = ResponseEntity.ok(
                        openSearchGetService.parseToContent(
                            openSearchGetService.get(request.tab, "popularity", request)
                        )
                    )
                }

                "new" -> {
                    response = ResponseEntity.ok(
                        openSearchGetService.parseToContent(
                            openSearchGetService.get(request.tab, "new", request)
                        )
                    )
                }

                // 탭이 없거나 위 3개가 아닐 경우 검색으로 인식함.
                else ->
                    response = ResponseEntity.ok(
                        openSearchGetService.parseToContent(
                            openSearchGetService.get("search", request.sort, request)
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
