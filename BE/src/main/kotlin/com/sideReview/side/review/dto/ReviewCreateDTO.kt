package com.sideReview.side.review.dto

data class ReviewCreateDTO(
    val dramaId:String,
    val content:String,
    val spoiler:Boolean
)