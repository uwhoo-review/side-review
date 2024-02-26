package com.sideReview.side.mypage.dto

data class FavoriteContentSearchDto(
    val id : String,
    val poster : String?,
    val name : String,
    val season : Int = 1,
    val date : String? = null,
    val director : List<String>,
    val genre: List<Int>?,
    val country: List<String>?,
    var rating: Float = 0.0f
)
