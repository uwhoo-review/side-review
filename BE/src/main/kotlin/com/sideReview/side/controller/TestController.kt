package com.sideReview.side.controller

import com.sideReview.side.login.NicknameService
import com.sideReview.side.mypage.MyPageService
import com.sideReview.side.tmdb.TmdbContentService
import com.sideReview.side.tmdb.TmdbPersonService
import kotlinx.coroutines.runBlocking
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class TestController(
    private val tmdbContentService: TmdbContentService,
    private val tmdbPersonService: TmdbPersonService,
    private val myPageService: MyPageService
) {
    @GetMapping("/init")
    fun getTmdb(): ResponseEntity<Any> {
        return ResponseEntity.ok(tmdbContentService.getMoreInfo(tmdbContentService.getAllContents()))
    }

    @GetMapping("/init/person")
    fun getPeople(): ResponseEntity<Any> {
        return ResponseEntity.ok(
            tmdbPersonService.getAllPeople()
        )
    }

    @GetMapping("/test")
    fun getTest(): ResponseEntity<Any> {
        return ResponseEntity.ok(myPageService.getMyPage("110383138275584860058"))
    }

    @GetMapping("/page")
    fun getPage(): ResponseEntity<Any> {
        var response: ResponseEntity<Any>
        runBlocking {
            response =
                ResponseEntity.ok(myPageService.getKeywordContent("110383138275584860058", "나는", 1, 6))
        }
        return response
    }

    @PostMapping("/test")
    fun addFavoriteContent(@RequestParam contentId : String) : ResponseEntity<Any>{
        return ResponseEntity.ok(myPageService.addFavoriteContent("110383138275584860058", contentId))
    }
}