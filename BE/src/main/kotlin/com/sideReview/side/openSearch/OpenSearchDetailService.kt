package com.sideReview.side.openSearch

import com.google.gson.Gson
import com.jillesvangurp.ktsearch.SearchClient
import com.jillesvangurp.ktsearch.SearchResponse
import com.jillesvangurp.ktsearch.search
import com.jillesvangurp.searchdsls.querydsl.bool
import com.jillesvangurp.searchdsls.querydsl.match
import com.sideReview.side.common.document.ContentDocument
import com.sideReview.side.openSearch.dto.Actor
import com.sideReview.side.openSearch.dto.Crew
import com.sideReview.side.openSearch.dto.DetailContentDto
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class OpenSearchDetailService @Autowired constructor(val client: SearchClient)  {
    private suspend fun findDocumentById(index : String, id: String) : SearchResponse {
        val search = client.search(index) {
            resultSize = 1
            query = bool { must(match("id", id)) }
        }
        return search
    }

    suspend fun getContentDocument(id: String) : DetailContentDto{
        val response: SearchResponse = findDocumentById("content", id)
        val source = response.hits?.hits?.get(0)?.source
        val document = Gson().fromJson(source.toString(), ContentDocument::class.java)
        return DetailContentDto(
            id = document.id,
            name = document.name,
            platform = document.platform,
            genre = document.genre,
            firstAirDate = document.firstAirDate,
            synopsis = document.synopsis,
            trailer = document.trailer,
            photo = document.photo,
            poster = document.poster,
            acting = null,
            crew = null,
            rating = document.rating,
            age = null,
            season = document.season
        )
    }
}