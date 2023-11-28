package com.sideReview.side.controller

import com.sideReview.side.common.util.MapperUtil
import com.sideReview.side.openSearch.OpenSearchGetService
import com.sideReview.side.openSearch.dto.*
import com.sideReview.side.person.PersonService
import com.sideReview.side.person.dto.PersonDto
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class MainContentsController @Autowired constructor(
    private val openSearchGetService: OpenSearchGetService,
    private val personService: PersonService
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
                            MapperUtil.parseSearchResponseToT<ContentDto>(
                                openSearchGetService.get(request.tab, "popularity", request)
                            ),
                            MapperUtil.parseSearchResponseToT<ContentDto>(
                                openSearchGetService.get(request.tab, "new", request)
                            )
                        )
                    )
                }

                "popularity" -> {
                    response = ResponseEntity.ok(
                        MapperUtil.parseSearchResponseToT<ContentDto>(
                            openSearchGetService.get(request.tab, "popularity", request)
                        )
                    )
                }

                "new" -> {
                    response = ResponseEntity.ok(
                        MapperUtil.parseSearchResponseToT<ContentDto>(
                            openSearchGetService.get(request.tab, "new", request)
                        )
                    )
                }

                // 탭이 없거나 위 3개가 아닐 경우 검색으로 인식함.
                else ->
                    response = ResponseEntity.ok(
                        SearchContentDto(
                            MatchDto(
                                content =
                                MapperUtil.parseSearchResponseToT<ContentDto>(
                                    openSearchGetService.get("search", request.sort, request)
                                ),
                                person = MapperUtil.parseSearchResponseToT<PersonDto>(
                                    personService.searchMatch(request.query)
                                )
                            ),
                            MapperUtil.parseSearchResponseToT<ContentDto>(
                                openSearchGetService.search(request.sort, request)
                            )
                        )

                    )
            }
        }
        return response
    }
}
