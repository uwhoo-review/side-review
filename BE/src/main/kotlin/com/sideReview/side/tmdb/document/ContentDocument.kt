package com.sideReview.side.tmdb.document

data class ContentDocument(
        val id: String,
        val name: String,
        val platform: List<String> ?= null,
        val genre: List<String> ?= null,
        val rating: Double ?= null,
        val first_air_date: String ?= null,
        val synopsis: String ?= null,
        val trailer: List<String> ?= null,
        val photo: List<String> ?= null,
        val poster: String ?= null,
        val avg_star_rating: Double ?= null
)
