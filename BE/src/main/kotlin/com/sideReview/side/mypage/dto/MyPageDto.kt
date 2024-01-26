package com.sideReview.side.mypage.dto

import com.sideReview.side.common.dto.RatingDto

data class MyPageDto(
    val user: UserInfo,
    val ott: List<Int>,
    val favorite: Favorite,
    val report: Report
)

data class UserInfo(
    val id : String,
    val profile: String? = "",
    val nickname: String,
    val email: String
)

data class Favorite(
    val person: List<FavoritePersonDto>,
    val contents: List<FavoriteContentDto>,
    val genre: List<Int>? = emptyList()
)

data class Report(
    val avgRating: Float? = null,
    val maxRating: Float? = null,
    val ratingCount: Int? = 0,
    val ratings: List<Rating>? = emptyList(),
    val director: String? = null,
    val actor: String? = null,
    val unique: List<UniqueRating>? = emptyList(),
    val genreFrequency: List<Genre>? = emptyList()
)

data class UniqueRating(
    val id : String,
    val name : String,
    val ratingDto: RatingDto
)

data class Rating(
    val rating: Float,
    val count: Int
)

data class Genre(
    val genre: Int,
    val count: Int
)
