package com.sideReview.side.myPage.dto

import com.sideReview.side.common.dto.PageInfoDto


data class FavoriteContentPageDto(
    val content: List<FavoriteContentDto>,
    val pageInfo: PageInfoDto
)
