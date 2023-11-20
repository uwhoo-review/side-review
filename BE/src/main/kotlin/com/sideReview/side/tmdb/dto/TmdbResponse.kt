package com.sideReview.side.tmdb.dto

data class TmdbResponse(
        val page: Int,
        val results: List<TmdbContent>,
        val total_results: Int,
        val total_pages: Int
)
data class TmdbContent(
        val first_air_date: String ?= null,
        val genre_ids: List<Int>,
        val id: String,
        val name: String,
        val origin_country: List<String>,
        val original_language: String,
        val original_name: String,
        val overview: String,
        val poster_path: String?,
        val popularity: Double,
        val vote_average: Double,
)