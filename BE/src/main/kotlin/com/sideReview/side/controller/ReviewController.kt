package com.sideReview.side.controller

import com.sideReview.side.review.ClientUtils
import com.sideReview.side.review.ReviewService
import com.sideReview.side.review.dto.ReviewCreateDTO
import com.sideReview.side.review.dto.ReviewDTO
import com.sideReview.side.review.dto.ReviewEvaDTO
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/review")
class ReviewController(val reviewService: ReviewService) {

    @GetMapping("")
    fun get(
        @RequestParam id: String,
        @RequestParam(required = false) sort: String?,
        @RequestParam(required = false) spoiler: Boolean?
    ): ResponseEntity<ReviewDTO> {
        val s = spoiler ?: false
        return ResponseEntity.ok(reviewService.get(id, sort, s))
    }

    @PostMapping("")
    fun create(
        @RequestBody body: ReviewCreateDTO,
        request: HttpServletRequest
    ): ResponseEntity<Any> {
        reviewService.create(
            body, ClientUtils.getIp(request)
        )
        return ResponseEntity(HttpStatus.OK)
    }

    @PutMapping("")
    fun evaluate(@RequestBody body: ReviewEvaDTO): ResponseEntity<Any> {
        if (body.eval != 0 && body.eval != 1) return ResponseEntity(HttpStatus.BAD_REQUEST)
        reviewService.evaluate(body)
        return ResponseEntity(HttpStatus.OK)
    }
    @GetMapping("/{id}")
    fun getAll(@PathVariable id : String,
               @RequestParam(required = false, defaultValue = "latest")  sort : String,
               @RequestParam(required = false, defaultValue = "best") mode : String,
               @RequestParam(required = false, defaultValue = "0") spoiler : String): ResponseEntity<ReviewDTO>{
        return ResponseEntity.ok(reviewService.getReviews(id, mode, sort, spoiler))
    }
}