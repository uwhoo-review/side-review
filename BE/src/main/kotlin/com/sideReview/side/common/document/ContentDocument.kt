package com.sideReview.side.common.document

import kotlinx.serialization.Serializable

@Serializable
data class ContentDocument(
    val id: String,
    val name: String,
    var platform: List<Int>? = null,
    var genre: List<Int>? = null,
    val rating: Double? = null,
    val firstAirDate: String? = null,
    val synopsis: String? = null,
    var trailer: List<String>? = null,
    var photo: List<String>? = null,
    var poster: String? = null,
    var avgStarRating: Float? = null,
    var season : List<String>? = null,
    var popularity: Double
)
