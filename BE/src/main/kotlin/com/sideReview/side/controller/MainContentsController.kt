package com.sideReview.side.controller

import com.sideReview.side.common.util.MapperUtils
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
                        MapperUtils.parseToContentDto(
                            openSearchGetService.get(request.tab, "popularity", request)
                        )
                    )

                    val latest = reviewService.fillReview(
                        MapperUtils.parseToContentDto(
                            openSearchGetService.get(request.tab, "new", request)
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
                    val lastOneYear =
                        MapperUtils.parseToContentDto(
                            openSearchGetService.get("main", "popularity", request)
                        )
                    val sortByPopular =
                        MapperUtils.parseToContentDto(
                            openSearchGetService.get(request.tab, "popularity", request)
                        )
                    response = ResponseEntity.ok(
                        reviewService.fillReview(lastOneYear.union(sortByPopular).toList())
                    )
                }

                "new" -> {
                    response = ResponseEntity.ok(
                        reviewService.fillReview(
                            MapperUtils.parseToContentDto(
                                openSearchGetService.get(request.tab, "new", request)
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
                val source = openSearchGetService.get("sortFilter", sort, request)
                response = ResponseEntity.ok(
                    SFContendDto(
                        total = source.hits?.total?.value?.toInt() ?: 0,
                        content = MapperUtils.parseToSimpleContentDto(source)
                    )
                )
            } else {
                val matchContent = openSearchGetService.get("search", request.sort, request)
                val matchPerson = personService.searchMatch(request.query)
                val similar = openSearchGetService.search(request.sort, request)

                response = ResponseEntity.ok(
                    SearchContentDto(
                        match = MatchDto(
                            content = MapperUtils.parseToSimpleContentDto(matchContent),
                            person = MapperUtils.parseToPersonDto(matchPerson)
                        ),
                        similar =
                        MapperUtils.parseToSimpleContentDto(similar),
                        total = SearchContentCountDto(
                            match = MatchCountDto(
                                content = matchContent.hits?.total?.value?.toInt() ?: 0,
                                person = matchPerson.hits?.total?.value?.toInt() ?: 0
                            ),
                            similar = similar.hits?.total?.value?.toInt() ?: 0
                        )
                    )
                )
            }
        }
        return response
    }
}
