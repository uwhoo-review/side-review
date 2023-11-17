package com.sideReview.side.tmdb.dto

data class PeopleResponse(
    val page: Int,
    val results: List<PersonInfo>,
    val total_results: Int,
    val total_pages: Int
)
data class PersonInfo(
    val adult : Boolean?,
    val gender : Int?,
    val id : Int,
    val known_for_department : String?,
    val name : String,
    val original_name : String?,
    val popularity : Float?,
    val profile_path : String?,
    val known_for : List<Map<String, Any>>?
)
