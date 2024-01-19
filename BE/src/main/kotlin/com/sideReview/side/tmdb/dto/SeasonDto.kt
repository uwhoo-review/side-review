package com.sideReview.side.tmdb.dto

import kotlinx.serialization.Serializable

@Serializable
data class SeasonDto(
    val id : String,
    val name: String
)
