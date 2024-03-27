package com.sideReview.side.controller

import com.sideReview.side.common.dto.UserInfoDto
import com.sideReview.side.common.entity.UserFavoriteContent
import com.sideReview.side.common.entity.UserInfo
import com.sideReview.side.common.util.ClientUtils
import com.sideReview.side.common.util.MapperUtils
import com.sideReview.side.login.LoginService
import com.sideReview.side.login.LoginUser
import com.sideReview.side.openSearch.OpensearchClient
import com.sideReview.side.openSearch.dto.*
import com.sideReview.side.review.ContentReviewFacade
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
    private val loginService: LoginService,
    private val contentReviewFacade: ContentReviewFacade
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
        val userEntity: UserInfo? =
            if (ClientUtils.getUserType(userId) == "1")
                loginService.getUser(userId)
            else null
        val userFavorite = userEntity?.favoriteContent

        logger.info("### test log ###")
        logger.info(userFavorite.toString())

        runBlocking {
            val reDup = requestDto.copy()
            // 로그인 user일 경우 ott_toggle이 true일 때 perferOtt로 filter추가.
            if (userEntity != null && loginService.isOttTrue(userId)) {
                if (userEntity.preferOtt != null && !userEntity.preferOtt.isNullOrBlank()) {
                    reDup.addFilter(
                        ContentRequestFilterDetail(
                            "platform",
                            MapperUtils.parseStringToList(userEntity.preferOtt!!)
                                .map { it.toString() }
                        )
                    )
                }
            }

            when (reDup.tab) {
                "main" -> {
                    reDup.sort = "popularity"
                    val popular = contentReviewFacade.fillReview(
                        opensearchClient.getContents(reDup, userId)
                    )
                    // userFavorite과 겹치는 id 모음
                    val popFavorite = getMatchId(userFavorite, popular)

                    reDup.sort = "new"
                    val latest = contentReviewFacade.fillReview(
                        opensearchClient.getContents(reDup, userId)
                    )
                    // userFavorite과 겹치는 id 모음
                    val latFavorite = getMatchId(userFavorite, latest)
                    logger.info("### test log ###")
                    logger.info(
                        MainContentUserFavorite(popFavorite, latFavorite)
                            .toString()
                    )
                    logger.info( MainContentDto(
                        popular,
                        latest,
                        MainContentUserFavorite(popFavorite, latFavorite)
                    ).toString())
                    response = ResponseEntity.ok(
                        MainContentDto(
                            popular,
                            latest,
                            MainContentUserFavorite(popFavorite, latFavorite)
                        )
                    )
                }

                "popularity" -> {
                    val page = requestDto.pagination ?: 0
                    val reDup2 = reDup.copy()
                    // 기간 filter 있는 맨 처음 20개를 제외하기 위해 가져옴.
                    reDup.pagination = 0
                    reDup.tab = "main"
                    reDup.sort = "popularity"
                    val lastOneYear = opensearchClient.getContents(reDup, userId)

                    // lastOneYear의 id를 제외, popularity 순으로 정렬, page-20번~30개 가져옴
                    reDup2.sort = "popularity"
                    reDup2.notQuery = lastOneYear.map { it.id }
                    reDup2.pagination = if (page < 20) page else page - 20
                    val sortByPopular = opensearchClient.getContents(reDup2, userId)

                    // 요청 데이터 번호가 20 이전일 경우 1년 내의 결과 + popularity 순에서 모자란거 채워서 30개 생성
                    val result = if (page < 20) {
                        contentReviewFacade.fillReview(
                            lastOneYear.subList(page, lastOneYear.size.coerceAtMost(19))
                                .union(sortByPopular.subList(0, 10 + page))
                                .toList()
                        )
                    } else {
                        contentReviewFacade.fillReview(sortByPopular.toList())
                    }
                    val favorite = getMatchId(userFavorite, result)
                    logger.info("### test log ###")
                    logger.info(
                        favorite
                            .toString()
                    )
                    logger.info(
                        MainPopDto(result, favorite)
                            .toString()
                    )
                    response = ResponseEntity.ok(MainPopDto(result, favorite))

                }

                "new", "open" -> {
                    reDup.sort = "new"
                    val result = contentReviewFacade.fillReview(
                        opensearchClient.getContents(reDup, userId)
                    )
                    val favorite = getMatchId(userFavorite, result)

                    response = ResponseEntity.ok(
                        MainPopDto(result, favorite)
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

    private fun getMatchId(
        userFavorite: List<UserFavoriteContent>?,
        content: List<ContentDto>
    ): List<String>? {
        return if (userFavorite != null) {
            val favoriteContentIdList = userFavorite.map { it.contentId }
            content.mapNotNull {
                if (favoriteContentIdList.contains(it.id))
                    it.id
                else null
            }
        } else null
    }

}
