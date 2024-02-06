package com.sideReview.side.mypage.dto
import com.sideReview.side.common.dto.PageInfoDto


data class FavoritePersonDto(
    val person: List<FavoritePersonDetailDto>,
    val pageInfo: PageInfoDto
)

data class FavoritePersonDetailDto(
    val id: Int,
    val name: String,
    val profilePath: String?,
    val cast: List<String>,
    val job: List<String>
)