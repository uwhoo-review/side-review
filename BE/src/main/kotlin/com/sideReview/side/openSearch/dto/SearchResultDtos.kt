package com.sideReview.side.openSearch.dto

import com.sideReview.side.common.dto.RatingDto
import kotlinx.serialization.Serializable

@Serializable
data class SearchContentDto(
    val total: Int,
    val content: List<SimpleContentDto>
)

@Serializable
data class SearchPersonDto(
    val total: Int,
    val content: List<PersonDto>
)

@Serializable
data class SimpleContentDto( //content 관련 기본 dto #convention
    val id: String,
    val name: String,
    val platform: List<Int>?,
    var poster: String? = null,
    val rating: RatingDto,
    val date: String? = null,
    val season: Season? = null
)
