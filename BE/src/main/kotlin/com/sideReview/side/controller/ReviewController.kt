package com.sideReview.side.controller

import com.sideReview.side.review.ReviewService
import com.sideReview.side.review.dto.ReviewDTO
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam

@Controller
class ReviewController(val reviewService: ReviewService) {

    @GetMapping
    fun get(
        @RequestParam id: String,
        @RequestParam(required = false) sort: String?,
        @RequestParam(required = false) spoiler:Boolean?
    ) : ReviewDTO {

        return reviewService.get(id, sort, spoiler)
    }
}