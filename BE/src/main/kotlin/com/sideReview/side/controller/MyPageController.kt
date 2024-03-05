package com.sideReview.side.controller

import com.sideReview.side.common.dto.UserInfoDto
import com.sideReview.side.common.exception.UserIdNotFoundException
import com.sideReview.side.login.LoginUser
import com.sideReview.side.login.NickNameDuplicateException
import com.sideReview.side.login.NicknameService
import com.sideReview.side.mypage.FavoriteContentDuplicateException
import com.sideReview.side.mypage.FavoritePersonDuplicateException
import com.sideReview.side.mypage.MyPageService
import com.sideReview.side.mypage.dto.FavoriteContentInputDto
import com.sideReview.side.review.ContentReviewFacade
import kotlinx.coroutines.runBlocking
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/user")
class MyPageController(
    val nicknameService: NicknameService,
    val myPageService: MyPageService,
    val contentReviewFacade: ContentReviewFacade
) {

    @GetMapping
    fun getMyPage(
        @LoginUser(required = false) user: UserInfoDto
    ): ResponseEntity<Any> {
        return ResponseEntity.ok(myPageService.getMyPage(user.id))
    }

    @PutMapping("/nickname")
    fun updateNickname(
        @LoginUser(required = false) user: UserInfoDto,
        @RequestParam name: String
    ): ResponseEntity<Any> {
        try {
            nicknameService.editNickname(user.id, name)
        } catch (e: NickNameDuplicateException) {
            return ResponseEntity.badRequest().body(e.message)
        }
        return ResponseEntity(HttpStatus.OK)
    }

    @GetMapping("/contents")
    fun getContents(
        @LoginUser(required = false) user: UserInfoDto,
        @RequestParam keyword: String,
        @RequestParam size: Int,
        @RequestParam page: Int
    ): ResponseEntity<Any> {
        var response: ResponseEntity<Any>
        try {
            runBlocking {
                val keywordContent = myPageService.getKeywordContent(user.id, keyword, page, size)
                response =
                    ResponseEntity.ok(
                        myPageService.fillUserSelectedContent(
                            keywordContent,
                            user.id
                        )
                    )
            }
        } catch (e: Exception) {
            response = when (e) {
                is UserIdNotFoundException -> {
                    ResponseEntity.badRequest().body(e.message)
                }

                else -> {
                    ResponseEntity.internalServerError().body(e.message)
                }
            }

        }
        return response
    }

    @GetMapping("/person")
    fun searchFavoritePerson(
        @LoginUser(required = false) user: UserInfoDto,
        @RequestParam keyword: String,
        @RequestParam size: Int,
        @RequestParam page: Int
    ): ResponseEntity<Any> {
        var response: ResponseEntity<Any> = ResponseEntity(HttpStatus.BAD_REQUEST)

        try {
            runBlocking {
                val keywordPerson = myPageService.getKeywordPerson(keyword, page, size)
                response =
                    ResponseEntity.ok(
                        myPageService.fillUserSelectedPerson(
                            keywordPerson,
                            user.id
                        )
                    )
            }
        } catch (e: Exception) {
            response = when (e) {
                is UserIdNotFoundException -> {
                    ResponseEntity.badRequest().body(e.message)
                }

                else -> {
                    ResponseEntity.internalServerError().body(e.message)
                }
            }

        }
        return response
    }

    @PutMapping("/person")
    fun saveFavoritePerson(
        @LoginUser(required = false) user: UserInfoDto,
        @RequestParam personId: String,
    ): ResponseEntity<Any> {
        var person: Any? = null
        try {
            myPageService.saveFavoritePerson(user.id, personId)
            runBlocking {
                person = myPageService.getOnePerson(personId)
            }
        } catch (e: FavoritePersonDuplicateException) {
            return ResponseEntity.badRequest().body(e.message)
        } catch (e: Exception) {
            return ResponseEntity.internalServerError().body(e.message)
        }
        return ResponseEntity.ok(person)
    }

    @DeleteMapping("/person")
    fun deleteFavoritePerson(
        @LoginUser(required = false) user: UserInfoDto,
        @RequestParam personId: String,
    ): ResponseEntity<Any> {
        kotlin.runCatching {
            myPageService.deleteFavoritePerson(user.id, personId)
        }.onFailure {
            return ResponseEntity.internalServerError().body(it.message)
        }
        return ResponseEntity.ok("delete success")
    }

    @PostMapping("/contents")
    fun addFavoriteContent(
        @LoginUser(required = false) user: UserInfoDto,
        @RequestParam contentId: String
    ): ResponseEntity<Any> {
        var content: Any? = null
        try {
            content = myPageService.addFavoriteContent(user.id, contentId)
        } catch (e: FavoriteContentDuplicateException) {
            return ResponseEntity.badRequest().body(e.message)
        } catch (e: Exception) {
            return ResponseEntity.internalServerError().body(e.message)
        }
        return ResponseEntity.ok(content)
    }

    @PutMapping("/contents")
    fun saveFavoriteContents(
        @LoginUser(required = false) user: UserInfoDto,
        @RequestBody contentsList: List<FavoriteContentInputDto>
    ): ResponseEntity<Any> {
        return ResponseEntity.ok(myPageService.saveFavoriteContent(user.id, contentsList))
    }

    @DeleteMapping("/contents")
    fun deleteFavoriteContent(
        @LoginUser(required = false) user: UserInfoDto,
        @RequestParam("contentId") contentId: String
    ): ResponseEntity<Any> {
        return ResponseEntity.ok(myPageService.deleteFavoriteContent(user.id, contentId))
    }

    @PutMapping("/ott")
    fun saveUserOTT(
        @LoginUser(required = false) user: UserInfoDto,
        @RequestBody ottList: List<Int>
    ): ResponseEntity<Any> {
        return ResponseEntity.ok(myPageService.saveOTT(user.id, ottList))
    }

    @PutMapping("/genre")
    fun saveUserGenre(
        @LoginUser(required = false) user: UserInfoDto,
        @RequestBody genreList: List<Int>
    ): ResponseEntity<Any> {
        return ResponseEntity.ok(myPageService.saveGenre(user.id, genreList))
    }

    @GetMapping("/review")
    fun getAllReviewsByWriterId(
        @LoginUser(required = false) user: UserInfoDto,
        @RequestParam(required = false, defaultValue = "0") page: String,
        @RequestParam(required = false, defaultValue = "6") size: String
    ): ResponseEntity<Any> {
        val pageable = PageRequest.of(page.toInt(), size.toInt())
        return ResponseEntity.ok(contentReviewFacade.getReviewsByWriterId(user.id, pageable))
    }

    @GetMapping("/star")
    fun getAllRatingsByWriterId(
        @LoginUser(required = false) user: UserInfoDto,
        @RequestParam(required = false, defaultValue = "0") page: String,
        @RequestParam(required = false, defaultValue = "6") size: String
    ): ResponseEntity<Any> {
        val pageable = PageRequest.of(page.toInt(), size.toInt())
        return ResponseEntity.ok(myPageService.getMyRating(user.id, pageable))
    }
}