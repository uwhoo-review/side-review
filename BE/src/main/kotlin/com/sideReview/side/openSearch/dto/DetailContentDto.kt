package com.sideReview.side.openSearch.dto

import kotlinx.serialization.Serializable
import com.sideReview.side.common.dto.RatingDto
import com.sideReview.side.tmdb.dto.SeasonDto

data class DetailContentDto(
    val id: String,
    val name: String,
    val originalName: String? = null,
    val originCountry: List<String>? = null,
    val platform: List<Int>?,
    val genre: List<Int>?,
    val date: String? = null,
    val synopsis: String?,
    val trailer: List<String>? = null,
    val photo: List<String>? = null,
    val poster: String? = null,
    val actors: List<Actor>? = null, // TODO : search랑 공통으로  #convention
    val crew: List<Crew>? = null,
    val age: Int? = null,
    val rating : RatingDto,
    var season: Season
    //TODO : 감독 이름 수집&추가
    //TODO: 시즌 부제 수집&추가
)
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