package com.sideReview.side.mypage.dto

data class FavoriteContentDto(
    val id : String,
    val poster : String?,
    val name : String,
    val year : String? = null,
    val director : List<String>,
    val genre: List<Int>?,
    val country: List<String>?,
    var rating: String = "-"
)
