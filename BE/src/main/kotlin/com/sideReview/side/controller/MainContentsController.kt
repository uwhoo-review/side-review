package com.sideReview.side.controller

import com.sideReview.side.common.dto.UserInfoDto
import com.sideReview.side.common.util.ClientUtils
import com.sideReview.side.common.util.MapperUtils
import com.sideReview.side.login.LoginService
import com.sideReview.side.login.LoginUser
import com.sideReview.side.openSearch.OpensearchClient
import com.sideReview.side.openSearch.dto.*
import com.sideReview.side.review.ReviewService
import kotlinx.coroutines.runBlocking
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/contents")
class MainContentsController @Autowired constructor(
    private val opensearchClient: OpensearchClient,
    private val reviewService: ReviewService,
    private val loginService: LoginService
) {
    val logger = LoggerFactory.getLogger(this::class.java)!!

    @PostMapping("")
    fun getContents(
        @RequestBody requestDto: ContentRequestDTO,
        request: HttpServletRequest,
        @LoginUser user: UserInfoDto?
    ): ResponseEntity<Any> {
        var response: ResponseEntity<Any> = ResponseEntity(HttpStatus.BAD_REQUEST)
        val userId = ClientUtils.getUserId(request, user)
        runBlocking {
            var reDup = requestDto.copy()
            logger.info("#### main contents ####")
            logger.info("userId : ${userId}")
            logger.info("user type: ${ClientUtils.getUserType(request, user)} -- 1 login 2 public")
            logger.info("is ott true : ${loginService.isOttTrue(userId)}")
            // 로그인 user일 경우 ott_toggle이 true일 때 perferOtt로 filter추가.
            if (ClientUtils.getUserType(request, user) == "1" && loginService.isOttTrue(userId)) {
                val userEntity = loginService.getUser(userId)
                if (userEntity.preferOtt != null && !userEntity.preferOtt.isNullOrBlank()) {
                    logger.info("오티티 필터 추가 ${
                        ContentRequestFilterDetail(
                            "platform",
                            MapperUtils.parseStringToList(userEntity.preferOtt!!)
                                .map { it.toString() }
                        ).toString()
                    }")
                    ContentRequestFilterDetail(
                        "platform",
                        MapperUtils.parseStringToList(userEntity.preferOtt!!).map { it.toString() }
                    )
                }
            }

            when (reDup.tab) {
                "main" -> {
                    reDup.sort = "popularity"
                    val popular = reviewService.fillReview(
                        opensearchClient.getContents(reDup, userId)
                    )

                    reDup.sort = "new"
                    val latest = reviewService.fillReview(
                        opensearchClient.getContents(reDup, userId)
                    )
                    response = ResponseEntity.ok(
                        MainContentDto(
                            popular,
                            latest
                        )
                    )
                }

                "popularity" -> {
                    val page = requestDto.pagination ?: 0

                    // 기간 filter 있는 맨 처음 20개를 제외하기 위해 가져옴.
                    reDup.pagination = 0
                    reDup.tab = "main"
                    reDup.sort = "popularity"
                    val lastOneYear = opensearchClient.getContents(reDup, userId)

                    // lastOneYear의 id를 제외, popularity 순으로 정렬, page-20번~30개 가져옴
                    reDup = requestDto.copy()
                    reDup.sort = "popularity"
                    reDup.notQuery = lastOneYear.map { it.id }
                    reDup.pagination = if (page < 20) page else page - 20
                    val sortByPopular = opensearchClient.getContents(reDup, userId)

                    // 요청 데이터 번호가 20 이전일 경우 1년 내의 결과 + popularity 순에서 모자란거 채워서 30개 생성
                    response = if (page < 20) {
                        ResponseEntity.ok(
                            reviewService.fillReview(
                                lastOneYear.subList(page, lastOneYear.size.coerceAtMost(19))
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
                            opensearchClient.getContents(reDup, userId)
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
            val reDup = request.copy()
            if (reDup.query.isNullOrBlank()) {
                if (reDup.sort.isNullOrBlank()) reDup.sort = "popularity"
                reDup.tab = "sortFilter"

                response = ResponseEntity.ok(
                    opensearchClient.getMatchContents(reDup)
                )
            } else {
                if (!reDup.sort.isNullOrBlank()) reDup.sort = null
                when (type) {
                    "content" -> {
                        reDup.tab = "search"
                        response = ResponseEntity.ok(
                            opensearchClient.getMatchContents(reDup)
                        )
                    }

                    "person" -> {
                        response = ResponseEntity.ok(
                            opensearchClient.getMatchPeople(reDup)
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
        val reDup = request.copy()
        if (reDup.query != null) {
            if (reDup.sort.isNullOrBlank()) reDup.sort = "popularity"
            reDup.tab = "search"
            runBlocking {
                response = ResponseEntity.ok(
                    opensearchClient.getSimilarContents(reDup)
                )
            }
        }
        return response
    }
}
