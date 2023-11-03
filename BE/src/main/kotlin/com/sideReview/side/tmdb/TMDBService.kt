package com.sideReview.side.tmdb

import com.sideReview.side.tmdb.dto.ContentDto
import com.sideReview.side.tmdb.dto.MainContentDto
import com.sideReview.side.tmdb.dto.TMDBContent
import com.sideReview.side.tmdb.dto.TMDBResponse
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class TMDBService @Autowired constructor(private val tmdbClient: TMDBClient){

    @Value("\${api.tmdb.key}")
    lateinit var accessKey: String

    fun putSearchServer(): TMDBResponse {
        return tmdbClient.getPopularTvShows("Bearer $accessKey",1)
    }
    fun getMainContents(tab : String): MainContentDto {
        var tmdb = tmdbClient.getPopularTvShows("Bearer $accessKey",1)
        val popular: MutableList<ContentDto> = mutableListOf();
        val latest: MutableList<ContentDto> = mutableListOf();
        val size : Int = when {
            tab == "main" -> 20
            else -> tmdb.results.indices.count()
            //TODO: latest, popular 경우의 case 확장
        }

        for(i in 0..size-1){
            val content : TMDBContent = tmdb.results[i]
            val contentDto : ContentDto = ContentDto(
                id = content.id,
                name = content.name,
                poster = content.poster_path,
                synopsis = content.overview,
                platform = listOf("netflix"),
                genre = content.genre_ids,
                year = content.first_air_date.substring(0, 4)
            )
            if(i < 10) latest.add(contentDto)
            else popular.add(contentDto)
        }
        return MainContentDto(latest = latest, popular = popular)
    }

}