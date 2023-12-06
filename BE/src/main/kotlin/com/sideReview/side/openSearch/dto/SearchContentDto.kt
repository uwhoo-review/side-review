package com.sideReview.side.openSearch.dto

import com.google.gson.Gson
import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.google.gson.annotations.JsonAdapter
import com.google.gson.reflect.TypeToken
import com.sideReview.side.person.dto.PersonDto
import kotlinx.serialization.Serializable
import java.lang.reflect.Type

@Serializable
data class SearchContentDto(
    val match: MatchDto,
    val similar: List<SimpleContentDto>
)

@JsonAdapter(MatchDtoDeserializer::class)
@Serializable
data class MatchDto(
    val content: List<SimpleContentDto>,
    val person: List<PersonDto>
)

@JsonAdapter(SimpleContentDeserializer::class)
@Serializable
data class SimpleContentDto(
    val id: String,
    val name: String,
    val platform: List<String>,
    var poster: String? = null,
    val rating: Double? = null,
    val year: String? = null
)

class SimpleContentDeserializer : JsonDeserializer<SimpleContentDto> {

    override fun deserialize(
        json: JsonElement?,
        typeOfT: Type?,
        context: JsonDeserializationContext?
    ): SimpleContentDto {
        val jsonObject =
            json?.asJsonObject ?: throw NullPointerException("Response Json String is null")
        val gson = Gson()
        val typeToken: Type = object : TypeToken<List<String>>() {}.type

        val id = jsonObject["id"].asString
        val name = jsonObject["name"].asString
        val platform = gson.fromJson<List<String>>(jsonObject["platform"], typeToken)
        val poster = jsonObject["poster"]?.asString
        val rating = jsonObject["rating"]?.asDouble
        val year = jsonObject["firstAirDate"]?.asString?.substring(0, 4)

        return SimpleContentDto(
            id, name, platform, poster, rating, year
        )
    }
}

class MatchDtoDeserializer : JsonDeserializer<MatchDto> {
    override fun deserialize(
        json: JsonElement?,
        typeOfT: Type?,
        context: JsonDeserializationContext?
    ): MatchDto {
        val jsonObject =
            json?.asJsonObject ?: throw NullPointerException("Response Json String is null")
        val gson = Gson()
        val contentTypeToken: Type = object : TypeToken<List<SimpleContentDto>>() {}.type
        val personTypeToken: Type = object : TypeToken<List<PersonDto>>() {}.type
        val content: List<SimpleContentDto> =
            gson.fromJson(jsonObject["content"].asJsonArray, contentTypeToken)
        val person: List<PersonDto> =
            gson.fromJson(jsonObject["person"].asJsonArray, personTypeToken)

        return MatchDto(
            content = content,
            person = person
        )
    }
}
