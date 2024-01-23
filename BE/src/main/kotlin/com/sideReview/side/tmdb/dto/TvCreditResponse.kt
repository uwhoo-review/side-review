package com.sideReview.side.tmdb.dto

data class TvCreditResponse(
    val cast: List<TvCastInfo>?,
    val crew: List<TvCrewInfo>?,
    val id: Int
)

data class TvCastInfo(
    val adult: Boolean?,
    val backdrop_path: String?,
    val genre_ids: List<Int>?,
    val id: Int,
    val origin_country: List<String>?,
    val original_language: String?,
    val original_name: String?,
    val overview: String?,
    val popularity: Double?,
    val poster_path: String?,
    val first_air_date: String?,
    val name: String?,
    val vote_average: Double?,
    val vote_count: Int?,
    val character: String?,
    val credit_id: String?,
    val episode_count: Int?
)

data class TvCrewInfo(
    val adult: Boolean?,
    val backdrop_path: String?,
    val genre_ids: List<Int>?,
    val id: Int,
    val origin_country: List<String>?,
    val original_language: String?,
    val original_name: String?,
    val overview: String?,
    val popularity: Double?,
    val poster_path: String?,
    val first_air_date: String?,
    val name: String?,
    val vote_average: Double?,
    val vote_count: Int?,
    val credit_id: String?,
    val episode_count: Int?,
    val department: String?,
    val job: String
)