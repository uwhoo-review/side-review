package com.sideReview.side.myPage.dto

import com.sideReview.side.review.dto.PageInfo

data class FavoritePersonDto(
    val person: List<FavoritePersonDetailDto>,
    val pageInfo: PageInfo
)

data class FavoritePersonDetailDto(
    val id: String,
    val name: String,
    val profilePath: String,
    val cast: List<String>
)