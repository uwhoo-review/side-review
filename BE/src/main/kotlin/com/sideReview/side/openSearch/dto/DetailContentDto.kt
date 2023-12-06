package com.sideReview.side.openSearch.dto

data class DetailContentDto(
    val id: String,
    val name: String,
    val originalName: String? = null,
    val originCountry: List<String>? = null,
    val platform: List<Int>?,
    val genre: List<Int>?,
    val firstAirDate: String? = null,
    val synopsis: String?,
    val trailer: List<String>? = null,
    val photo: List<String>? = null,
    val poster: String? = null,
    val acting: List<Actor>? = null,
    val crew: List<Crew>? = null,
    val rating: Double? = null,
    val age: Int? = null,
    var season: List<String>? = null
)

data class Actor(
    val name: String,
    val id : String,
    val role: String
)

data class Crew(
    val name: String,
    val id : String,
    val job: String
)
