package com.sideReview.side.common.document

import kotlinx.serialization.Serializable

//@JsonAdapter(ContentDocumentDeserializer::class)
@Serializable
data class ContentDocument(
    val id: String,
    val name: String,
    val originalName: String,
    val sortingName: String,
    var age: String? = "",
    var platform: List<Int>? = null,
    var genre: List<Int>? = null,
    val rating: Double? = null,
    val firstAirDate: String?,
    val synopsis: String? = null,
    var trailer: List<String>? = null,
    var photo: List<String>? = null,
    var poster: String? = null,
    var avgStarRating: Float? = null,
    var season: List<Season> = emptyList(),
    var popularity: Double? = null,
    var episodeCount: Int? = null,
    var production: Product? = null,
    var directors: List<String> = emptyList()
) {
    fun getYear(): String {
        return if (firstAirDate.isNullOrBlank()) "" else firstAirDate.substring(0, 4)
    }
}

@Serializable
data class Product(
    var company: List<String>? = null,
    var country: List<String>? = null
)

@Serializable
data class Season(
    val id: String,
    val name: String
)

/*
class ContentDocumentDeserializer : JsonDeserializer<ContentDocument>() {
    override fun deserialize(
        json: JsonElement?,
        typeOfT: Type?,
        context: JsonDeserializationContext?
    ): ContentDocument {
        val jsonObject =
            json?.asJsonObject ?: throw NullPointerException("Response Json String is null")
        val gson = Gson()
        val seasonTypeToken: Type = object : TypeToken<Season>() {}.type

        val id = jsonObject["id"].asString
        val name = jsonObject["name"].asString
        val platform = gson.fromJson<List<String>>(jsonObject["platform"], typeToken)
        val genre = gson.fromJson<List<String>>(jsonObject["genre"], typeToken)
        val year = jsonObject["firstAirDate"]?.asString?.substring(0, 4)
        val synopsis = jsonObject["synopsis"]?.asString
        val trailer_ = gson.fromJson<List<String>>(jsonObject["trailer"], typeToken)
        var trailer = ""
        if (trailer_.isNotEmpty()) {
            trailer = trailer_[0]
        }
        val poster = jsonObject["poster"]?.asString
        val rating = jsonObject["rating"]?.asDouble
        val season = gson.fromJson<List<String>>(jsonObject["season"], typeToken)


        return ContentDocument(
            id = id,
            name = name,
            platform = platform,
            genre = genre,
            rating = rating,
            year = year,
            synopsis = synopsis,
            trailer = trailer,
            poster = poster,
            actors = null,
            age = null,
            season = season,
            review = null
        )


        ContentDocument(
            id = id + "_" + "$season",
            sortingName = detailResponse.name,
            name = detailResponse.name,
            originalName = detailResponse.original_name,
            platform = provider,
            genre = genreList,
            rating = seasonInfo?.vote_average?.div(2),
            firstAirDate = seasonInfo?.air_date,
            synopsis = seasonInfo?.overview ?: detailResponse.overview,
            trailer = trailer,
            photo = image,
            poster = seasonInfo?.poster_path?.substring(1)
                ?: detailResponse.poster_path?.substring(1),
            avgStarRating = null,
            season = emptyList(),
            popularity = null,
            episodeCount = seasonInfo?.episode_count,
        )
    }
}
 */