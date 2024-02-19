package com.sideReview.side.mypage.dto

data class MyPageDto(
    val user: UserInfo,
    val ott: List<Int>,
    val favorite: Favorite,
    val report: Report
)

data class UserInfo(
    val id: String,
    val profile: String? = "",
    val nickname: String,
    val email: String
)

data class Favorite(
    val person: List<FavoritePersonDetailDto>,
    val contents: List<FavoriteContentDto>,
    val genre: List<Int>? = emptyList()
)

data class Report(
    val avgRating: Float? = null,
    val maxRating: Float? = null,
    val ratingCount: Int? = 0,
    val reviewCount: Int? = 0,
    val ratings: List<Rating>? = emptyList(),
    val director: Person? = null,
    val actor: Person? = null,
    val unique: List<UniqueRating>? = emptyList(),
    val genreFrequency: List<Genre>? = emptyList()
)

data class UniqueRating(
    val id: String,
    var name: String,
    var poster: String,
    val rating: Float,
    val userRating: Float,
)

data class Rating(
    val rating: Float,
    val count: Int
)

data class Genre(
    val genre: Int,
    val count: Int
)

data class Person @JvmOverloads constructor(
    val id: Int = 0,
    val name: String = ""
)