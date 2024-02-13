package com.sideReview.side.controller

import com.sideReview.side.common.dto.UserInfoDto
import com.sideReview.side.common.util.ClientUtils
import com.sideReview.side.login.LoginUser
import com.sideReview.side.review.StarRatingService
import com.sideReview.side.review.dto.StarRatingCreateDto
import com.sideReview.side.review.dto.StarRatingUpdateDto
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/star/{id}")
class StarRatingController(val starRatingService: StarRatingService) {
    @PostMapping
    fun create(
        @PathVariable id: String,
        @RequestBody dto: StarRatingCreateDto,
        request: HttpServletRequest
    ): ResponseEntity<Any> {
        starRatingService.saveStarRating(dto, ClientUtils.getUserId(request))
        return ResponseEntity(HttpStatus.OK)
    }

    @PutMapping
    fun update(
        @PathVariable id: String,
        @RequestBody dto: StarRatingUpdateDto,
        @LoginUser(required = false) user: UserInfoDto
    ): ResponseEntity<Any> {
        starRatingService.editStarRating(dto, user.id)
        return ResponseEntity(HttpStatus.OK)
    }

    @DeleteMapping
    fun delete(
        @PathVariable id: String,
        @LoginUser(required = false) user: UserInfoDto
    ): ResponseEntity<Any> {
        return ResponseEntity.ok(
            starRatingService.deleteStartRating(
                id,
                user.id
            )
        )
    }
}