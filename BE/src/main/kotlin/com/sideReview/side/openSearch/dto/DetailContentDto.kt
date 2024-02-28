package com.sideReview.side.openSearch.dto

import kotlinx.serialization.Serializable
import com.sideReview.side.common.dto.RatingDto
import com.sideReview.side.review.dto.ReviewDetailDto
import com.sideReview.side.tmdb.dto.SeasonDto

data class DetailContentDto(
    val id: String,
    val name: String,
    val originalName: String? = null,
    val originCountry: List<String>? = null,
    val platform: List<Int>?,
    val genre: List<Int>?,
    val date: String? = "",
    val synopsis: String?,
    val trailer: List<String>? = null,
    val photo: List<String>? = null,
    val poster: String? = null,
    val actors: List<Actor>? = null,
    val crew: List<Crew>? = null,
    val directors: List<String>? = null,
    val age: String? = "",
    val rating: RatingDto,
    var review: ReviewDetailDto,          // 사용자의 리뷰
    var season: Season,
    val episodeCnt: Int? = 0
) {
    fun getYear(): String {
        return if (date.isNullOrBlank()) "" else date.substring(0, 4)
    }
    fun getSeason(): Int {
        val seasonString = id.split("_")
        var season = "1"
        if(seasonString.size > 1) season = seasonString[1].toString()
        return season.toInt()
    }
}

data class Actor(
    val name: String,
    val id: String,
    val role: String,
    val profilePath: String
)

data class Crew(
    val name: String,
    val id: String,
    val job: String,
    val profilePath: String
)
@Serializable
data class Season(
    val now: Int,
    val list: List<SeasonDto> = emptyList()
)