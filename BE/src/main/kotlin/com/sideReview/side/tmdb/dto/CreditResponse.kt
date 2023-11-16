package com.sideReview.side.tmdb.dto

data class CreditResponse(
    val cast : List<CastInfo>?,
    val crew : List<CrewInfo>?,
    val id : Int
)

data class CastInfo(
    val adult : Boolean?,
    val gender : Int?,
    val id :String?,
    val known_for_department : String?,
    val name : String?,
    val original_name : String?,
    val popularity : Double?,
    val profile_path :String?,
    val character :String?,
    val credit_id : String?,
    val order : Int?
)

data class CrewInfo(
    val adult : Boolean?,
    val gender : Int?,
    val id :String?,
    val known_for_department : String?,
    val name : String?,
    val original_name : String?,
    val popularity : Double?,
    val profile_path :String?,
    val credit_id : String?,
    val department : String?,
    val job : String?
)