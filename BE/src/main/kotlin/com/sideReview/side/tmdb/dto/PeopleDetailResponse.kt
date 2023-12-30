package com.sideReview.side.tmdb.dto

data class PeopleDetailResponse(
    val adult : Boolean,
    val also_known_as : List<String>,
    val biography : String,
    val birthday : String,
    val deathday : String?,
    val gender : Int,
    val homepage : String,
    val id : Int,
    val imdb_id: String,
    val known_for_department : String,
    val name: String,
    val place_of_birth : String,
    val popularity : Float?,
    val profile_path : String?
)
