package com.sideReview.side.tmdb.document

import kotlinx.serialization.Serializable

@Serializable
data class ContentDocument(
    val id: Int,
    val name: String,
    var platform: List<Int>? = null,
    var genre: List<Int>? = null,
    val rating: Double? = null,
    val firstAirDate: String? = null,
    val synopsis: String? = null,
    var trailer: List<String>? = null,
    var photo: List<String>? = null,
    var poster: String? = null,
    var avgStarRating: Float? = null
)
