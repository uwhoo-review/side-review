package com.sideReview.side.tmdb.dto

data class ContentDto(
    //TODO : 장르 Enum class, actor, trailer, rating, age
    val id: Int,
    val name: String,
    val platform: List<String>,
    val genre: List<Int>,
    val year: String ?= null,
    val synopsis: String,
    val trailer: String = "d9iBOTL4zgc",
    val poster: String ?= null,
    val actors: List<String> = listOf("김영은", "김지훈", "노소은", "류고은", "김혜진"),
    val rating: Double = 3.5,
    val age: Int = 29
)
