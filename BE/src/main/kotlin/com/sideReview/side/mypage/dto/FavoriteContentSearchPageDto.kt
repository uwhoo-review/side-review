package com.sideReview.side.mypage.dto

import com.sideReview.side.common.dto.PageInfoDto


data class FavoriteContentSearchPageDto(
    val content: List<FavoriteContentSearchDto>,
    val pageInfo: PageInfoDto
)
