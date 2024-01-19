package com.sideReview.side.myPage.dto
import com.sideReview.side.common.dto.PageInfoDto


data class FavoritePersonDto(
    val person: List<FavoritePersonDetailDto>,
    val pageInfo: PageInfoDto
)

data class FavoritePersonDetailDto(
    val id: String,
    val name: String,
    val profilePath: String,
    val cast: List<String>
)