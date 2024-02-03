package com.sideReview.side.tmdb.dto

data class ContentRatingResponse(
    val results: List<ContentRatingInfo>,
    val id: Int
)

data class ContentRatingInfo(
    val descriptors: List<Any>,
    val iso_3166_1: String,
    val rating: String
)
