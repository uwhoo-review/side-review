package com.sideReview.side.openSearch

import com.google.gson.Gson
import com.jillesvangurp.ktsearch.SearchClient
import com.jillesvangurp.ktsearch.SearchResponse
import com.jillesvangurp.ktsearch.search
import com.jillesvangurp.searchdsls.querydsl.SortOrder
import com.jillesvangurp.searchdsls.querydsl.sort
import com.sideReview.side.tmdb.dto.ContentDto
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class OpenSearchGetService @Autowired constructor(val client: SearchClient) {

    suspend fun get(tab: String, sort: String): SearchResponse {
        val search = client.search("content") {
            // tab 따라 max 설정
            resultSize = when (tab) {
                "main" -> 20
                else -> 100
            }

            // sort 따라 정렬 기준 설정
            sort {
                when (sort) {
                    "popularity" -> add("popularity", SortOrder.DESC)
                    "new" -> add("firstAirDate", SortOrder.DESC)
                    "name" -> add("name", SortOrder.ASC)
                    "rating" -> add("rating", SortOrder.DESC)
                }
            }
        }
        return search
    }

    fun parseToContent(response: SearchResponse): List<ContentDto> {
        val contentList: MutableList<ContentDto> = mutableListOf();
        val hits = response.hits
        if (hits != null) {
            for (data in hits.hits) {
                if (data.source != null) {
                    contentList.add(Gson().fromJson(data.source.toString(), ContentDto::class.java))
                }
            }
        }
        return contentList
    }
}