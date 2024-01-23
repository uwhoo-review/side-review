package com.sideReview.side.common.util

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.jillesvangurp.ktsearch.SearchResponse
import com.sideReview.side.common.constant.GenreEnum
import com.sideReview.side.common.constant.ProviderEnum
import com.sideReview.side.common.document.ContentDocument
import com.sideReview.side.common.document.PersonDocument
import com.sideReview.side.common.dto.RatingDto
import com.sideReview.side.openSearch.dto.ContentDto
import com.sideReview.side.openSearch.dto.DetailContentDto
import com.sideReview.side.openSearch.dto.SimpleContentDto
import com.sideReview.side.person.dto.PersonDto
import com.sideReview.side.review.dto.ReviewDetailDto
import com.sideReview.side.review.entity.UserReview
import com.sideReview.side.tmdb.dto.ImageResponse
import com.sideReview.side.tmdb.dto.PersonInfo
import com.sideReview.side.tmdb.dto.SeasonImageResponse
import com.sideReview.side.tmdb.dto.TmdbContent
import java.lang.reflect.Type

object MapperUtils {
    fun mapTmdbToDocument(tmdbContentList: List<TmdbContent>): MutableList<ContentDocument> {
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
        }.toMutableList()
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

    private fun <T> parse(response: SearchResponse, collectionType: Type): List<T> {
        val mutableList: MutableList<T> = mutableListOf();
        val hits = response.hits
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

    fun parseToContentDto(response: SearchResponse): List<ContentDto> {
        val collectionType: Type = object : TypeToken<ContentDto>() {}.type
        return parse(response, collectionType)
    }

    fun parseToContentDocument(response: SearchResponse): List<ContentDocument> {
        val collectionType: Type = object : TypeToken<ContentDocument>() {}.type
        return parse(response, collectionType)
    }

    fun parseToPersonDto(response: SearchResponse): List<PersonDto> {
        val collectionType: Type = object : TypeToken<PersonDto>() {}.type
        return parse(response, collectionType)
    }

    fun parseToPersonDocument(response: SearchResponse): List<PersonDocument> {
        val collectionType: Type = object : TypeToken<PersonDocument>() {}.type
        return parse(response, collectionType)
    }

    fun parseToSimpleContentDto(response: SearchResponse): List<SimpleContentDto> {
        val collectionType: Type = object : TypeToken<SimpleContentDto>() {}.type
        return parse(response, collectionType)
    }

    fun mapUserReviewToReviewDetailDTO(review: List<UserReview>): List<ReviewDetailDto> {
        val details = mutableListOf<ReviewDetailDto>()
        for (r in review) {
            details.add(
                ReviewDetailDto(
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

    fun mapDetailToContent(detail: DetailContentDto): ContentDto {
        return ContentDto(
            detail.id,
            detail.name,
            detail.platform,
            detail.genre,
            detail.date?.substring(0, 4),
            detail.synopsis,
            if (!detail.trailer.isNullOrEmpty()) detail.trailer[0] else null,
            detail.poster,
            detail.rating,
            if (!detail.actors.isNullOrEmpty()) detail.actors.map { it.name } else null,
            detail.age,
            detail.season,
            null // TODO. Review 추가
        )
    }

    fun mapDetailToSimpleContent(detail: DetailContentDto): SimpleContentDto {
        return SimpleContentDto(
            detail.id,
            detail.name,
            detail.platform,
            detail.poster,
            detail.rating,
            detail.date?.substring(0, 4)
        )
    }

    fun parseSearchResponseToSimpleContentDto(response: SearchResponse): SimpleContentDto {
        val source = response.hits?.hits?.get(0)?.source
        val document = Gson().fromJson("$source", ContentDocument::class.java)
        return SimpleContentDto(
            document.id,
            document.name,
            document.platform,
            document.poster,
            RatingDto(document.rating?.toFloat(),0,null),
            document.firstAirDate
        )
    }
}