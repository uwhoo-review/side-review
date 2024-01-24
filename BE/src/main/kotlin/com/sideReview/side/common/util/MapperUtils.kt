package com.sideReview.side.common.util

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.jillesvangurp.ktsearch.SearchResponse
import com.sideReview.side.common.constant.GenreEnum
import com.sideReview.side.common.constant.ProviderEnum
import com.sideReview.side.common.document.ContentDocument
import com.sideReview.side.common.document.PersonDocument
import com.sideReview.side.common.dto.RatingDto
import com.sideReview.side.myPage.dto.FavoriteContentDto
import com.sideReview.side.myPage.dto.FavoritePersonDetailDto
import com.sideReview.side.openSearch.dto.*
import com.sideReview.side.review.dto.ReviewDetailDto
import com.sideReview.side.review.entity.UserReview
import com.sideReview.side.tmdb.dto.*
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

    fun mapCastContentToDocument(tvCastInfoList: List<TvCastInfo>): MutableList<ContentDocument> {
        return tvCastInfoList.map {
            ContentDocument(
                id = it.id.toString(),
                sortingName = it.name ?: "",
                name = it.name ?: "",
                originalName = it.original_name ?: "",
                platform = null,
                genre = it.genre_ids,
                rating = it.vote_average?.div(2),
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

    fun mapCrewContentToDocument(tvCrewInfoList: List<TvCrewInfo>): MutableList<ContentDocument> {
        return tvCrewInfoList.map {
            ContentDocument(
                id = it.id.toString(),
                sortingName = it.name ?: "",
                name = it.name ?: "",
                originalName = it.original_name ?: "",
                platform = null,
                genre = it.genre_ids,
                rating = it.vote_average?.div(2),
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
            detail.getYear(),
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
            detail.getYear()
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
            RatingDto(document.rating?.toFloat(), 0, null),
            document.firstAirDate
        )
    }

    fun mapDetailTofavoriteContent(detailContentDto: DetailContentDto): FavoriteContentDto {
        return FavoriteContentDto(
            id = detailContentDto.id,
            poster = detailContentDto.poster,
            name = detailContentDto.name,
            year = detailContentDto.getYear(),
            director = detailContentDto.directors ?: emptyList(),
            genre = detailContentDto.genre,
            country = detailContentDto.originCountry
            // user 개인의 rating은 외부에서 따로 넣음
        )
    }

    fun mapDetailToPerson(dto: DetailPersonDto): PersonDto {
        return PersonDto(
            id = dto.id,
            name = dto.name,
            profilePath = dto.profilePath,
            cast = mapCastItemToRole(dto.cast),
            crew = mapCrewItemToJob(dto.crew)
        )
    }

    private fun mapCastItemToRole(cast: List<CastItem>?): List<PersonRoleDto>? {
        if (cast.isNullOrEmpty()) return emptyList()
        return cast.map {
            PersonRoleDto(
                it.role,
                it.contentId
            )
        }
    }

    private fun mapCrewItemToJob(crew: List<CrewItem>?): List<PersonJobDto>? {
        if (crew.isNullOrEmpty()) return emptyList()
        return crew.map {
            PersonJobDto(
                it.job,
                it.contentId
            )
        }
    }

    fun mapDetailToFavoritePersonDetail(dto: DetailPersonDto): FavoritePersonDetailDto {
        return FavoritePersonDetailDto(
            id = dto.id,
            name = dto.name,
            profilePath = dto.profilePath,
            cast = dto.cast?.map { it.contentName } ?: emptyList()
        )
    }
}