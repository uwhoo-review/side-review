package com.sideReview.side.controller

import com.sideReview.side.common.util.MapperUtils
import com.sideReview.side.login.NicknameService
import com.sideReview.side.myPage.MyPageService
import com.sideReview.side.person.PersonService
import kotlinx.coroutines.runBlocking
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/user/{userId}")
class MyPageController(
    val nicknameService: NicknameService,
    val myPageService: MyPageService,
    val personService: PersonService
) {
    @PutMapping
    fun updateNickname(
        @PathVariable userId: String,
        @RequestParam name: String
    ): ResponseEntity<Any> {
        nicknameService.editNickname(userId, name)
        return ResponseEntity(HttpStatus.OK)
    }

    @GetMapping
    fun getContents(
        @PathVariable userId: String,
        @RequestParam keyword: String,
        @RequestParam size: Int,
        @RequestParam page: Int
    ): ResponseEntity<Any> {
        var response: ResponseEntity<Any>
        runBlocking {
            response =
                ResponseEntity.ok(myPageService.getKeywordContent(userId, keyword, page, size))
        }
        return response
    }

    @GetMapping("/person")
    fun searchFavoritePerson(
        @PathVariable userId: String,
        @RequestParam keyword: String,
        @RequestParam size: Int,
        @RequestParam page: Int
    ): ResponseEntity<Any> {
        var response: ResponseEntity<Any> = ResponseEntity(HttpStatus.BAD_REQUEST)
        runBlocking {
            response =
                ResponseEntity.ok(myPageService.getKeywordPerson(keyword, page, size))
        }
        return response
    }

    @PutMapping("/person")
    fun saveFavoritePerson(
        @PathVariable userId: String,
        @RequestParam personId: String,
    ): ResponseEntity<Any> {
        var body: Any? = null
        kotlin.runCatching {
            val favoritePerson = myPageService.saveFavoritePerson(userId, personId)
            runBlocking {
                body = MapperUtils.parseToPersonDto(personService.get(favoritePerson.personId))[0]
            }
        }.onFailure {
            return ResponseEntity.internalServerError().body(it.message)
        }
        return ResponseEntity.ok(body)
    }
}