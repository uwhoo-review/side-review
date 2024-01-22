package com.sideReview.side.controller

import com.sideReview.side.review.ClientUtils
import com.sideReview.side.review.StarRatingService
import com.sideReview.side.review.dto.StarRatingCreateDto
import com.sideReview.side.review.dto.StarRatingUpdateDto
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/star/{id}")
class StarRatingController ( val starRatingService: StarRatingService){
    @PostMapping
    fun create(@PathVariable id :String,
               @RequestBody dto : StarRatingCreateDto,
               request: HttpServletRequest
    ): ResponseEntity<Any> {
        starRatingService.saveStarRating(dto, ClientUtils.getIp(request))
        return ResponseEntity(HttpStatus.OK)
    }

    @PutMapping
    fun update(@PathVariable id :String,
               @RequestBody dto : StarRatingUpdateDto,
               request: HttpServletRequest
    ): ResponseEntity<Any> {
        starRatingService.editStarRating(dto, ClientUtils.getIp(request))
        return ResponseEntity(HttpStatus.OK)
    }

    @DeleteMapping
    fun delete(@PathVariable id :String,
               request: HttpServletRequest
    ) :ResponseEntity<Any> {
        return ResponseEntity.ok(starRatingService.deleteStartRating(id, ClientUtils.getIp(request)))
    }
}