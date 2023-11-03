package com.sideReview.side.tmdb.document

data class ContentDocument(
        val id: String,
        val name: String,
        val platform: String,
        val genre: List<String>,
        val rating: Double,
        val first_air_date: String,
        val synopsis: String,
        val trailer: List<String>,
        val photo: List<String>,
        val poster: String,
        val avg_star_rating: Double
)
