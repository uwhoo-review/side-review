package com.sideReview.side.tmdb.dto

data class ContentDto(
    //TODO : actor, trailer, rating, age
    val id: Int,
    val name: String,
    val platform: List<String>,
    val genre: List<String>,
    val year: String ?= null,
    val synopsis: String,
    val trailer: String ?= null,
    val poster: String ?= null,
    val actors: List<String> ?= null,
    val rating: Double ?= null,
    val age: Int ?= null
)
