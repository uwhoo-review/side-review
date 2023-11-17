package com.sideReview.side.openSearch

import com.google.gson.Gson
import com.jillesvangurp.ktsearch.SearchClient
import com.jillesvangurp.ktsearch.SearchResponse
import com.jillesvangurp.ktsearch.search
import com.jillesvangurp.searchdsls.querydsl.SortOrder
import com.jillesvangurp.searchdsls.querydsl.sort
import com.sideReview.side.tmdb.dto.ContentDto
import org.springframework.stereotype.Service

@Service
class OpenSearchGetService(val client: SearchClient, val svc: OpenSearchSaveService) {

    suspend fun get(tab: String, sort: String): SearchResponse {
        val search = client.search("content") {
            resultSize = 20
            sort {
                add("name", SortOrder.ASC)
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