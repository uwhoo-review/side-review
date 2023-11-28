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
    val similar: List<ContentDto>
)

@JsonAdapter(MatchDtoDeserializer::class)
@Serializable
data class MatchDto(
    val content: List<ContentDto>,
    val person: List<PersonDto>
)

class MatchDtoDeserializer : JsonDeserializer<MatchDto> {
    override fun deserialize(
        json: JsonElement?,
        typeOfT: Type?,
        context: JsonDeserializationContext?
    ): MatchDto {
        val jsonObject =
            json?.asJsonObject ?: throw NullPointerException("Response Json String is null")
        val gson = Gson()
        val contentTypeToken: Type = object : TypeToken<List<ContentDto>>() {}.type
        val personTypeToken: Type = object : TypeToken<List<PersonDto>>() {}.type
        val content: List<ContentDto> =
            gson.fromJson(jsonObject["content"].asJsonArray, contentTypeToken)
        val person: List<PersonDto> =
            gson.fromJson(jsonObject["person"].asJsonArray, personTypeToken)

        return MatchDto(
            content = content,
            person = person
        )
    }
}
