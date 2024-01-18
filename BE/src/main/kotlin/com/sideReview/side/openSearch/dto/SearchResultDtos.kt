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
    val total: Int,
    val content: List<SimpleContentDto>
)

@Serializable
data class SearchPersonDto(
    val total: Int,
    val content: List<PersonDto>
)

@JsonAdapter(SimpleContentDeserializer::class)
@Serializable
data class SimpleContentDto( //content 관련 기본 dto #convention
    val id: String,
    val name: String,
    val platform: List<String>,
    var poster: String? = null,
    val rating: Double? = null,
    val year: String? = null
    //TODO: year -> date 로 변환. 이거는 무조건 날짜까지 들어가고 알아서 파싱되도록 #convention
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
