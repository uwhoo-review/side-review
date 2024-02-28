package com.sideReview.side.openSearch.dto

import com.sideReview.side.common.dto.RatingDto
import com.sideReview.side.review.dto.ReviewDto
import kotlinx.serialization.Serializable

//@JsonAdapter(ContentDeserializer::class)
@Serializable
data class ContentDto(
    val id: String,
    val name: String,
    val platform: List<Int>?,
    val genre: List<Int>? = null,
    val date: String? = null,
    var synopsis: String? = null,
    val trailer: String? = null,
    var poster: String? = null,
    val rating: RatingDto? = null,
    val actors: List<String>? = null,
    val age: String? = null,
    val season: Season? = null,
    var review: ReviewDto? = null           // 전체 리뷰
)
//
//class ContentDeserializer : JsonDeserializer<ContentDto> {
//    override fun deserialize(
//        json: JsonElement?,
//        typeOfT: Type?,
//        context: JsonDeserializationContext?
//    ): ContentDto {
//        val jsonObject =
//            json?.asJsonObject ?: throw NullPointerException("Response Json String is null")
//        val gson = Gson()
//        val typeToken: Type = object : TypeToken<List<String>>() {}.type
//
//        val id = jsonObject["id"].asString
//        val name = jsonObject["name"].asString
//        val platform = gson.fromJson<List<String>>(jsonObject["platform"], typeToken)
//        val genre = gson.fromJson<List<String>>(jsonObject["genre"], typeToken)
//        val year = jsonObject["firstAirDate"]?.asString?.substring(0, 4)
//        val synopsis = jsonObject["synopsis"]?.asString
//        val trailer_ = gson.fromJson<List<String>>(jsonObject["trailer"], typeToken)
//        var trailer = ""
//        if (trailer_.isNotEmpty()) {
//            trailer = trailer_[0]
//        }
//        val poster = jsonObject["poster"]?.asString
//        val rating = jsonObject["rating"]?.asDouble
//        val season = gson.fromJson<List<String>>(jsonObject["season"], typeToken)
//
//        return ContentDto(
//            id = id,
//            name = name,
//            platform = platform,
//            genre = genre,
//            rating = rating,
//            year = year,
//            synopsis = synopsis,
//            trailer = trailer,
//            poster = poster,
//            actors = null,
//            age = null,
//            season = season,
//            review = null
//        )
//    }
//}