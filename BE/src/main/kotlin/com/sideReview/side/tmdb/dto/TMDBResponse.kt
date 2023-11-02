package com.sideReview.side.tmdb.dto

data class TMDBResponse(
        val page: Int,
        val results: List<TMDBContent>,
        val total_results: Int,
        val total_pages: Int
)
data class TMDBContent(
        val first_air_date: String,
        val genre_ids: List<Int>,
        val id: Int,
        val name: String,
        val origin_country: List<String>,
        val original_language: String,
        val original_name: String,
        val overview: String,
        val poster_path: String?,
        val popularity: Double,
        val vote_average: Double,
)