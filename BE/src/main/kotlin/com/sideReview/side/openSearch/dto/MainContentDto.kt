package com.sideReview.side.openSearch.dto

data class MainContentDto(
    val popular: List<ContentDto>,
    val latest: List<ContentDto>,
    val favorite: MainContentUserFavorite = MainContentUserFavorite(null, null)
)

// 로그인 한 유저의 경우 인생작 id를 리스트로 추가
data class MainContentUserFavorite(
    val popular: List<String>? = null,
    val latest: List<String>? = null
)

data class MainPopDto(
    val content: List<ContentDto>,
    val favorite: List<String>?
)