package com.sideReview.side.common.util

import com.sideReview.side.common.constant.GenreEnum
import com.sideReview.side.common.constant.ProviderEnum
import com.sideReview.side.common.document.ContentDocument
import com.sideReview.side.common.document.PersonDocument
import com.sideReview.side.tmdb.dto.PersonInfo
import com.sideReview.side.tmdb.dto.TmdbContent

object MapperUtil {
    fun mapTmdbToDocument(tmdbContentList: List<TmdbContent>): List<ContentDocument> {
        return tmdbContentList.map {
            ContentDocument(
                id = it.id,
                name = it.name,
                platform = null,
                genre = it.genre_ids,
                rating = it.vote_average,
                firstAirDate = it.first_air_date,
                synopsis = it.overview,
                trailer = null,
                photo = null,
                poster = it.poster_path?.substring(1),
                avgStarRating = null
            )
        }
    }

    fun mapPeopleInfoToDocument(personInfoList: List<PersonInfo>) : List<PersonDocument> {
        return personInfoList.map {
            PersonDocument(
                id = it.id,
                name = it.name,
                profilePath = it.profile_path?.substring(1),
                popularity = it.popularity,
                cast = null,
                crew = null
            )

        }
    }

    fun mapGenreCodeToString(numbers: List<Int>): List<String> {
        return numbers.mapNotNull { number ->
            GenreEnum.values().find { it.id == number }?.genre
        }
    }

    fun mapProviderStringToCode(strings: List<String>): List<Int> {
        return strings.mapNotNull { string ->
            ProviderEnum.values().find { it.name == string.uppercase() }?.value
        }
    }

    fun mapProviderCodeToString(numbers: List<Int>): List<String> {
        return numbers.mapNotNull { number ->
            ProviderEnum.values().find { it.value == number }?.name.toString()
        }
    }
}