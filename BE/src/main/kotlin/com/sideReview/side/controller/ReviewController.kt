package com.sideReview.side.controller

import com.sideReview.side.common.dto.UserInfoDto
import com.sideReview.side.common.exception.UserIdNotFoundException
import com.sideReview.side.common.util.ClientUtils
import com.sideReview.side.login.LoginUser
import com.sideReview.side.review.ContentReviewFacade
import com.sideReview.side.review.ReviewService
import com.sideReview.side.review.dto.ReviewCreateDto
import com.sideReview.side.review.dto.ReviewEvaDto
import com.sideReview.side.review.exception.*
import io.ktor.util.logging.*
import org.slf4j.LoggerFactory
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/review")
class ReviewController(
    private val reviewService: ReviewService,
    private val contentReviewFacade: ContentReviewFacade
) {
    val logger = LoggerFactory.getLogger(this::class.java)!!

    @PutMapping("")
    fun createOrUpdate(
        @RequestBody body: ReviewCreateDto,
        @LoginUser user: UserInfoDto?,
        request: HttpServletRequest
    ): ResponseEntity<Any> {
        try {
            reviewService.createOrUpdate(
                body, ClientUtils.getUserId(request, user), ClientUtils.getUserType(request, user)
            )
            return ResponseEntity(HttpStatus.OK)
        } catch (e: Exception) {
            logger.error(e.message)
            logger.error(e.stackTraceToString())
            return when (e) {
                is UserIdNotFoundException -> {
                    logger.error("UserId : ${ClientUtils.getUserId(request, user)}")
                    ResponseEntity.badRequest().body(e.message)
                }

                is ReviewSaveDuplicateException, is ReviewGetIdInvalidException ->
                    ResponseEntity.badRequest().body(e.message)

                else -> ResponseEntity.internalServerError().body(e.message)
            }
        }
    }

    @PutMapping("/eval")
    fun evaluate(
        @RequestBody body: ReviewEvaDto,
        @LoginUser user: UserInfoDto?,
        request: HttpServletRequest
    ): ResponseEntity<Any> {
        val userId = ClientUtils.getUserId(request, user)
        if (body.eval != 0 && body.eval != 1) return ResponseEntity.badRequest()
            .body("Review eval error : eval not 0 or 1.")
        try {
            reviewService.evaluate(body, userId)
        } catch (e: Exception) {
            when (e) {
                is ReviewEvalReviewNotFound -> return ResponseEntity.badRequest().body(e.message)
            }
        }
        return ResponseEntity(HttpStatus.OK)
    }

    @GetMapping("/{id}")
    fun getAllReviewsById(
        @PathVariable id: String,
        @RequestParam(required = false, defaultValue = "best") sort: String,
        @RequestParam(required = false, defaultValue = "0") spoiler: String,
        @RequestParam(required = false, defaultValue = "0") page: String,
        @RequestParam(required = false, defaultValue = "6") size: String,
        @RequestParam(required = false, defaultValue = "0") type: String,
        @LoginUser(required = false) user: UserInfoDto?,
        request: HttpServletRequest
    ): ResponseEntity<Any> {
        val pageable = PageRequest.of(page.toInt(), size.toInt())
        try {
            return ResponseEntity.ok(
                contentReviewFacade.getReviewsByTargetId(
                    id,
                    sort,
                    spoiler,
                    type,
                    pageable
                )
            )
        } catch (e: Exception) {
            when (e) {
                is ReviewGetAllSortException, is ReviewGetAllTypeException ->
                    return ResponseEntity.badRequest().build()

                else -> return ResponseEntity.internalServerError().build()
            }
        }
    }

    @DeleteMapping("")
    fun delete(
        @RequestParam(required = true) id: String,
        @LoginUser user: UserInfoDto
    ): ResponseEntity<Any> {
        try {
            reviewService.delete(id, user.id)
            return ResponseEntity.ok().body("review delete success.")
        } catch (e: Exception) {
            logger.error(e.message)
            logger.error(e.stackTraceToString())
            return when (e) {
                is UserIdNotFoundException -> ResponseEntity.badRequest().body(e.message)
                else -> ResponseEntity.internalServerError().body(e.message)
            }
        }
    }
}