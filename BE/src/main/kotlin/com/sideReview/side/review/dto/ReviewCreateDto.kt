package com.sideReview.side.review.dto

data class ReviewCreateDto(
    val reviewId:String?,
    val dramaId:String,
    val content:String,
    val spoiler:Boolean
)