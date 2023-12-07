package com.sideReview.side.controller

import com.sideReview.side.common.util.ContentUtils
import com.sideReview.side.common.util.MapperUtil
import com.sideReview.side.openSearch.OpenSearchGetService
import com.sideReview.side.openSearch.dto.*
import com.sideReview.side.person.PersonService
import com.sideReview.side.review.ReviewService
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/contents")
class MainContentsController @Autowired constructor(
    private val openSearchGetService: OpenSearchGetService,
    private val personService: PersonService,
    private val reviewService: ReviewService
) {

    @PostMapping("")
    fun getContents(
        @RequestBody request: ContentRequestDTO
    ): ResponseEntity<Any> {
        var response: ResponseEntity<Any> = ResponseEntity(HttpStatus.BAD_REQUEST)
        runBlocking {
            when (request.tab) {
                "main" -> {
                    val popular = reviewService.fillReview(
                        ContentUtils.fill(
                            MapperUtil.parseToContentDto(
                                openSearchGetService.get(request.tab, "popularity", request)
                            )
                        )
                    )

                    val latest = reviewService.fillReview(
                        ContentUtils.fill(
                            MapperUtil.parseToContentDto(
                                openSearchGetService.get(request.tab, "new", request)
                            )
                        )
                    )
                    response = ResponseEntity.ok(
                        MainContentDto(
                            popular,
                            latest
                        )
                    )
                }

                "popularity" -> {
                    response = ResponseEntity.ok(
                        reviewService.fillReview(
                            ContentUtils.fill(
                                MapperUtil.parseToContentDto(
                                    openSearchGetService.get(request.tab, "popularity", request)
                                )
                            )
                        )
                    )
                }

                "new" -> {
                    response = ResponseEntity.ok(
                        reviewService.fillReview(
                            ContentUtils.fill(
                                MapperUtil.parseToContentDto(
                                    openSearchGetService.get(request.tab, "new", request)
                                )
                            )
                        )
                    )
                }
            }
        }
        return response
    }


    @PostMapping("/search")
    fun searchContents(
        @RequestBody request: ContentRequestDTO
    ): ResponseEntity<Any> {
        var response: ResponseEntity<Any> = ResponseEntity(HttpStatus.BAD_REQUEST)
        runBlocking {
            // 정렬 & 필터만 있을 경우
            if (request.query.isNullOrBlank()) {
                val sort = if (request.sort.isNullOrBlank()) "popularity" else request.sort
                response = ResponseEntity.ok(
                    MapperUtil.parseToSimpleContentDto(
                        openSearchGetService.get("search", sort, request)
                    )
                )
            } else {
                response = ResponseEntity.ok(
                    SearchContentDto(
                        match = MatchDto(
                            content =
                            MapperUtil.parseToSimpleContentDto(
                                openSearchGetService.get(
                                    "search",
                                    request.sort,
                                    request
                                )
                            ),
                            person = MapperUtil.parseToPersonDto(
                                personService.searchMatch(request.query)
                            )
                        ),
                        similar =
                        MapperUtil.parseToSimpleContentDto(
                            openSearchGetService.search(request.sort, request)
                        )
                    )
                )
            }
        }
        return response
    }

    @PostMapping("/search/count")
    fun searchContentsCnt(
        @RequestBody request: ContentRequestDTO
    ): ResponseEntity<Any> {
        var response: ResponseEntity<Any> = ResponseEntity(HttpStatus.BAD_REQUEST)
        runBlocking {
            // 정렬 & 필터만 있을 경우
            if (request.query.isNullOrBlank()) {
                response =
                    ResponseEntity.ok(openSearchGetService.count("get", request))
            } else {
                response =
                    ResponseEntity.ok(
                        SearchContentCountDto(
                            match = MatchCountDto(
                                content = openSearchGetService.count(
                                    "get",
                                    request
                                ),
                                person = personService.searchMatchCount(request.query)
                            ),
                            similar = openSearchGetService.count(
                                "search",
                                request
                            )
                        )
                    )
            }
        }
        return response;
    }
}
