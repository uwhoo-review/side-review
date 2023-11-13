package com.sideReview.side.common.util

import com.sideReview.side.common.constant.GenreEnum
import com.sideReview.side.common.constant.ProviderEnum
import com.sideReview.side.tmdb.document.ContentDocument
import com.sideReview.side.tmdb.dto.TbdbContent

object MapperUtil {
    fun mapTmdbToDocument(tbdbContentList: List<TbdbContent>): List<ContentDocument> {
        return tbdbContentList.map { tbdbContent ->
            ContentDocument(
                id = tbdbContent.id,
                name = tbdbContent.name,
                platform = null,
                genre = tbdbContent.genre_ids.map { genreId -> genreId.toString() },
                rating = tbdbContent.vote_average,
                first_air_date = tbdbContent.first_air_date,
                synopsis = tbdbContent.overview,
                trailer = null,
                photo = null,
                poster = tbdbContent.poster_path,
                avg_star_rating = null
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