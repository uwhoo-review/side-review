package com.sideReview.side.review.dto

data class StarRatingUpdateDto(
    val contentId : String,
    val rating : Float,
    val ratingId : Int
)
