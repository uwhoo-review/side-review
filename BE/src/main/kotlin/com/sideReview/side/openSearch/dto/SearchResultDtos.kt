package com.sideReview.side.openSearch.dto

import com.sideReview.side.common.dto.RatingDto
import kotlinx.serialization.Serializable

@Serializable
data class SearchContentDto(
    val total: Int,
    val content: List<SimpleContentDto>
)

@Serializable
data class SearchPersonDto(
    val total: Int,
    val content: List<PersonDto>
)

//@JsonAdapter(SimpleContentDeserializer::class)
@Serializable
data class SimpleContentDto( //content 관련 기본 dto #convention
    val id: String,
    val name: String,
    val platform: List<Int>?,
    var poster: String? = null,
    val rating: RatingDto,
    val date: String? = null,
    val season: Season? = null
)

//class SimpleContentDeserializer : JsonDeserializer<SimpleContentDto> {
//
//    override fun deserialize(
//        json: JsonElement?,
//        typeOfT: Type?,
//        context: JsonDeserializationContext?
//    ): SimpleContentDto {
//        val jsonObject =
//            json?.asJsonObject ?: throw NullPointerException("Response Json String is null")
//        val gson = Gson()
//        val typeToken: Type = object : TypeToken<List<Int>>() {}.type
//
//        val id = jsonObject["id"].asString
//        val name = jsonObject["name"].asString
//        val platform = gson.fromJson<List<Int>>(jsonObject["platform"], typeToken)
//        val poster = jsonObject["poster"]?.asString
//        val rating = jsonObject["rating"]?.asDouble
//        val year = jsonObject["firstAirDate"]?.asString?.substring(0, 4)
//
//        return SimpleContentDto(
//            id, name, platform, poster, rating, year
//        )
//    }
//}
