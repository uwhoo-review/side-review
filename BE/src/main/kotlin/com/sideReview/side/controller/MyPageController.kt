package com.sideReview.side.controller

import com.sideReview.side.login.NicknameService
import com.sideReview.side.review.ClientUtils
import com.sideReview.side.review.dto.StarRatingUpdateDto
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/user/{userId}")
class MyPageController (val nicknameService: NicknameService){
    @PutMapping
    fun update(@PathVariable userId :String,
               @RequestParam name : String
    ): ResponseEntity<Any> {
        nicknameService.editNickname(userId, name)
        return ResponseEntity(HttpStatus.OK)
    }
}