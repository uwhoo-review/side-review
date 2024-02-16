package com.sideReview.side.mypage.dto

data class FavoriteContentDto(
    val id : String,
    val poster : String?,
    val name : String,
    val date : String? = "",
    var rating: Float = 0.0f,
    val provider: List<Int>,
    val rank: Int
)
