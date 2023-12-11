package com.sideReview.side.common.util

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.jillesvangurp.ktsearch.SearchResponse
import com.sideReview.side.common.constant.GenreEnum
import com.sideReview.side.common.constant.ProviderEnum
import com.sideReview.side.common.document.ContentDocument
import com.sideReview.side.common.document.PersonDocument
import com.sideReview.side.openSearch.dto.ContentDto
import com.sideReview.side.openSearch.dto.SimpleContentDto
import com.sideReview.side.person.dto.PersonDto
import com.sideReview.side.review.dto.ReviewDetailDTO
import com.sideReview.side.review.entity.UserReview
import com.sideReview.side.tmdb.dto.ImageResponse
import com.sideReview.side.tmdb.dto.PersonInfo
import com.sideReview.side.tmdb.dto.SeasonImageResponse
import com.sideReview.side.tmdb.dto.TmdbContent
import java.lang.reflect.Type

object MapperUtil {
    fun mapTmdbToDocument(tmdbContentList: List<TmdbContent>): List<ContentDocument> {
        return tmdbContentList.map {
            ContentDocument(
                id = it.id,
                sortingName = it.name,
                name = it.name,
                originalName = it.original_name,
                platform = null,
                genre = it.genre_ids,
                rating = it.vote_average / 2,
                firstAirDate = it.first_air_date,
                synopsis = it.overview,
                trailer = null,
                photo = null,
                poster = it.poster_path?.substring(1),
                avgStarRating = null,
                popularity = it.popularity,
                production = null
            )
        }
    }

    fun mapPeopleInfoToDocument(personInfoList: List<PersonInfo>): List<PersonDocument> {
        return personInfoList.map {
            PersonDocument(
                id = it.id,
                sortingName = it.name,
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
        return numbers.map { number ->
            "${ProviderEnum.values().find { it.value == number }?.name}"
        }
    }

    fun mapSeasonTODefault(seasonResponse: SeasonImageResponse): ImageResponse? {
        return seasonResponse.posters?.let {
            ImageResponse(
                backdrops = it
            )
        }
    }

    fun parseToContentDto(response: SearchResponse): List<ContentDto> {
        val mutableList: MutableList<ContentDto> = mutableListOf();
        val hits = response.hits
        val collectionType: Type = object : TypeToken<ContentDto>() {}.type
        if (hits != null) {
            for (data in hits.hits) {
                if (data.source != null) {
                    mutableList.add(
                        Gson().fromJson(
                            "${data.source}",
                            collectionType
                        )
                    )
                }
            }
        }
        return mutableList.toList()
    }

    fun parseToPersonDto(response: SearchResponse): List<PersonDto> {
        val mutableList: MutableList<PersonDto> = mutableListOf();
        val hits = response.hits
        val collectionType: Type = object : TypeToken<PersonDto>() {}.type
        if (hits != null) {
            for (data in hits.hits) {
                if (data.source != null) {
                    mutableList.add(
                        Gson().fromJson(
                            "${data.source}",
                            collectionType
                        )
                    )
                }
            }
        }
        return mutableList.toList()
    }

    fun parseToSimpleContentDto(response: SearchResponse): List<SimpleContentDto> {
        val mutableList: MutableList<SimpleContentDto> = mutableListOf();
        val hits = response.hits
        val collectionType: Type = object : TypeToken<SimpleContentDto>() {}.type
        if (hits != null) {
            for (data in hits.hits) {
                if (data.source != null) {
                    mutableList.add(
                        Gson().fromJson(
                            "${data.source}",
                            collectionType
                        )
                    )
                }
            }
        }
        return mutableList.toList()
    }

    fun mapUserReviewToReviewDetailDTO(review: List<UserReview>): List<ReviewDetailDTO> {
        val details = mutableListOf<ReviewDetailDTO>()
        for (r in review) {
            details.add(
                ReviewDetailDTO(
                    id = r.reviewId,
                    content = r.content,
                    date = "${r.create}",
                    like = r.like,
                    dislike = r.dislike,
                    spoiler = r.spoiler != "0"
                )
            )
        }
        return details
    }

}