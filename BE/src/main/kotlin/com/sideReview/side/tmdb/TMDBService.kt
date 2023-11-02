package com.sideReview.side.tmdb

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
}