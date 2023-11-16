package com.sideReview.side.tmdb.dto

data class ImageResponse(
    val backdrops : List<ImageInfo>
)

data class ImageInfo(
    val aspect_ratio : Float,
    val height : Int,
    val iso_639_1 : String?,
    val file_path : String,
    val vote_average : Float,
    val vote_count : Int,
    val width : Int
)