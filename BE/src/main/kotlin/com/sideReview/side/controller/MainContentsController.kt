package com.sideReview.side.controller

import com.sideReview.side.common.util.MapperUtils
import com.sideReview.side.openSearch.OpenSearchGetService
import com.sideReview.side.openSearch.OpensearchClient
import com.sideReview.side.openSearch.dto.*
import com.sideReview.side.person.PersonService
import com.sideReview.side.review.ReviewService
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/contents")
class MainContentsController @Autowired constructor(
    private val openSearchGetService: OpenSearchGetService,
    private val opensearchClient: OpensearchClient,
    private val personService: PersonService,
    private val reviewService: ReviewService
) {

    @PostMapping("")
    fun getContents(
        @RequestBody request: ContentRequestDTO
    ): ResponseEntity<Any> {
        var response: ResponseEntity<Any> = ResponseEntity(HttpStatus.BAD_REQUEST)
        runBlocking {
            var reDup = request.copy()
            when (reDup.tab) {
                "main" -> {
                    reDup.sort = "popularity"
                    val popular = reviewService.fillReview(
                        opensearchClient.getContents(reDup)
                    )

                    reDup.sort = "new"
                    val latest = reviewService.fillReview(
                        opensearchClient.getContents(reDup)
                    )
                    response = ResponseEntity.ok(
                        MainContentDto(
                            popular,
                            latest
                        )
                    )
                }

                "popularity" -> {
                    val page = request.pagination ?: 0

                    // 기간 filter 있는 맨 처음 20개를 제외하기 위해 가져옴.
                    reDup.pagination = 0
                    reDup.tab = "main"
                    reDup.sort = "popularity"
                    val lastOneYear = opensearchClient.getContents(reDup)

                    // lastOneYear의 id를 제외, popularity 순으로 정렬, page-20번~30개 가져옴
                    reDup = request.copy()
                    reDup.sort = "popularity"
                    reDup.notQuery = lastOneYear.map { it.id }
                    reDup.pagination = if (page < 20) page else page - 20
                    val sortByPopular = opensearchClient.getContents(reDup)

                    // 요청 데이터 번호가 20 이전일 경우 1년 내의 결과 + popularity 순에서 모자란거 채워서 30개 생성
                    response = if (page < 20) {
                        ResponseEntity.ok(
                            reviewService.fillReview(
                                lastOneYear.subList(page, 19)
                                    .union(sortByPopular.subList(0, 10 + page))
                                    .toList()
                            )
                        )
                    } else {
                        ResponseEntity.ok(
                            reviewService.fillReview(sortByPopular.toList())
                        )
                    }

                }

                "new", "open" -> {
                    reDup.sort = "new"
                    response = ResponseEntity.ok(
                        reviewService.fillReview(
                            opensearchClient.getContents(reDup)
                        )
                    )
                }
            }
        }
        return response
    }


    @PostMapping("/search/match")
    fun searchContents(
        @RequestBody request: ContentRequestDTO,
        @RequestParam type: String?
    ): ResponseEntity<Any> {
        var response: ResponseEntity<Any> = ResponseEntity(HttpStatus.BAD_REQUEST)
        runBlocking {
            if (request.sort.isNullOrBlank()) request.sort = "popularity"
            if (request.query.isNullOrBlank()) {
                val content = openSearchGetService.get("sortFilter", request.sort, request)
                response = ResponseEntity.ok(
                    SearchContentDto(
                        total = content.hits?.total?.value?.toInt() ?: 0,
                        content = MapperUtils.parseToSimpleContentDto(content)
                    )
                )
            } else {
                when (type) {
                    "content" -> {
                        val matchContent = openSearchGetService.get("search", request.sort, request)
                        response = ResponseEntity.ok(
                            SearchContentDto(
                                total = matchContent.hits?.total?.value?.toInt() ?: 0,
                                content = MapperUtils.parseToSimpleContentDto(matchContent)
                            )
                        )
                    }

                    "person" -> {
                        val matchPerson =
                            personService.searchMatch(request.query, request.pagination ?: 0, 12)
                        response = ResponseEntity.ok(
                            SearchPersonDto(
                                total = matchPerson.hits?.total?.value?.toInt() ?: 0,
                                content = MapperUtils.parseToPersonDto(matchPerson)

                            )
                        )
                    }
                }
            }
        }
        return response
    }

    @PostMapping("/search/similar")
    fun searchContents(
        @RequestBody request: ContentRequestDTO
    ): ResponseEntity<Any> {
        var response: ResponseEntity<Any> = ResponseEntity(HttpStatus.BAD_REQUEST)
        if (request.query != null) {
            if (request.sort.isNullOrBlank()) request.sort = "popularity"
            request.tab = "search"
            runBlocking {
                val similar = openSearchGetService.search(request.sort, request)
                response = ResponseEntity.ok(
                    SearchContentDto(
                        content = MapperUtils.parseToSimpleContentDto(similar),
                        total = similar.hits?.total?.value?.toInt() ?: 0
                    )
                )
            }
        }
        return response
    }
}
