package com.sideReview.side.myPage.dto

import com.sideReview.side.common.dto.PageInfo


data class FavoriteContentPageDto(
    val content: List<FavoriteContentDto>,
    val pageInfo: PageInfo
)
