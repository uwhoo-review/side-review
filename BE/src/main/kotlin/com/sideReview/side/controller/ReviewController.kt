package com.sideReview.side.controller

import com.sideReview.side.common.util.ClientUtils
import com.sideReview.side.review.ReviewService
import com.sideReview.side.review.dto.ReviewCreateDto
import com.sideReview.side.review.dto.ReviewEvaDto
import com.sideReview.side.review.exception.ReviewUpdateException
import io.ktor.util.logging.*
import org.slf4j.LoggerFactory
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/review")
class ReviewController(val reviewService: ReviewService) {
    val logger = LoggerFactory.getLogger(this::class.java)!!

    @PostMapping("")
    fun createOrUpdate(
        @RequestBody body: ReviewCreateDto,
        request: HttpServletRequest
    ): ResponseEntity<Any> {
        try {
            reviewService.createOrUpdate(
                body, ClientUtils.getUserId(request)
            )
            return ResponseEntity(HttpStatus.OK)
        } catch (e: ReviewUpdateException) {
            logger.error("############################################")
            logger.error("########### Error on Review Save ###########")
            logger.error("############################################")
            logger.error(e.message)
            logger.error("${e.stackTrace}")
            return ResponseEntity(HttpStatus.BAD_REQUEST)

        } catch (e: Exception) {
            logger.error("############################################")
            logger.error("########### Error on Review Save ###########")
            logger.error("############################################")
            logger.error(e.message)
            logger.error("${e.stackTrace}")
            return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @PutMapping("")
    fun evaluate(@RequestBody body: ReviewEvaDto): ResponseEntity<Any> {
        if (body.eval != 0 && body.eval != 1) return ResponseEntity(HttpStatus.BAD_REQUEST)
        runCatching {
            reviewService.evaluate(body)
        }.onFailure {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }

        return ResponseEntity(HttpStatus.OK)
    }

    @GetMapping("/{id}")
    fun getAllReviewsById(
        @PathVariable id: String,
        @RequestParam(required = false, defaultValue = "best") sort: String,
        @RequestParam(required = false, defaultValue = "0") spoiler: String,
        @RequestParam(required = false, defaultValue = "0") page: String,
        @RequestParam(required = false, defaultValue = "6") size: String
    ): ResponseEntity<Any> {
        val pageable = PageRequest.of(page.toInt(), size.toInt())
        return ResponseEntity.ok(reviewService.getReviewsByTargetId(id, sort, spoiler, pageable))
    }
}