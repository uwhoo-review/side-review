package com.sideReview.side.openSearch.dto

import com.fasterxml.jackson.annotation.JsonInclude

data class MainContentDto(
    val popular: List<ContentDto>,
    val latest: List<ContentDto>,
    @JsonInclude(JsonInclude.Include.NON_NULL)
    val favorite: MainContentUserFavorite
)

// 로그인 한 유저의 경우 인생작 id를 리스트로 추가
data class MainContentUserFavorite(
    @JsonInclude(JsonInclude.Include.NON_NULL)
    val popular: List<String>? = null,
    @JsonInclude(JsonInclude.Include.NON_NULL)
    val latest: List<String>? = null
)

data class MainPopDto(
    val content: List<ContentDto>,
    @JsonInclude(JsonInclude.Include.NON_NULL)
    val favorite: List<String>?
)