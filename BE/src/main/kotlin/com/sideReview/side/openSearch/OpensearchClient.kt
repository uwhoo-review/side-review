package com.sideReview.side.openSearch

import com.jillesvangurp.ktsearch.SearchResponse
import com.jillesvangurp.searchdsls.querydsl.ESQuery
import com.sideReview.side.openSearch.dto.ContentRequestDTO
import kotlinx.coroutines.runBlocking
import org.springframework.stereotype.Service

class OpensearchClient(
    val openSearchGetService: OpenSearchGetService,
    val openSearchDetailService: OpenSearchDetailService
) {
    // template
    // 사용 방법 가이드
    fun findContents() {
        // SearchResponse 가져오는 단계
        val request: ContentRequestDTO = ContentRequestDTO(
            tab = null,
            sort = null,
            query = "",
            notQuery = null,
            filter = null,
            pagination = null
        )
        val query: (request: ContentRequestDTO) -> ESQuery = (

                )
        val response: SearchResponse
        runBlocking {
            response = openSearchGetService.search("content", request, query)
        }

        // Response 가공 단계 > 각자 알아서
    }
}