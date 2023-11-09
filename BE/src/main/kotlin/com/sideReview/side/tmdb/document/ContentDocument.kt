package com.sideReview.side.tmdb.document

data class ContentDocument(
        val id: Int,
        val name: String,
        var platform: List<String> ?= null,
        var genre: List<String> ?= null,
        val rating: Double ?= null,
        val first_air_date: String ?= null,
        val synopsis: String ?= null,
        var trailer: List<String> ?= null,
        var photo: List<String> ?= null,
        var poster: String ?= null,
        var avg_star_rating: Double ?= null
)
