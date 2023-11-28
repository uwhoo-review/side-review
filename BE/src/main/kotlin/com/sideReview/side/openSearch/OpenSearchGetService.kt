package com.sideReview.side.openSearch

import com.jillesvangurp.ktsearch.SearchClient
import com.jillesvangurp.ktsearch.SearchResponse
import com.jillesvangurp.ktsearch.search
import com.jillesvangurp.searchdsls.querydsl.*
import com.sideReview.side.openSearch.dto.ContentRequestDTO
import com.sideReview.side.openSearch.dto.ContentRequestFilterDetail
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class OpenSearchGetService @Autowired constructor(val client: SearchClient) {

    suspend fun get(tab: String, sort: String?, request: ContentRequestDTO?): SearchResponse {
        val filterList = getFilterFromRequest(request)

        // client 요청 전송
        val search = client.search("content") {
            // tab 따라 max 설정
            resultSize = when (tab) {
                "main" -> 20
                else -> 100
            }

            // sort 따라 정렬 기준 설정
            // sort가 있으면 항상 score가 나오지 않음.
            sort {
                getSortFromRequest(sort)
            }

            if (request != null && (!request.query.isNullOrBlank() || !request.filter.isNullOrEmpty())) {
                query = bool {
                    if (request.filter != null)
                        filter(filterList)
                    if (!request.query.isNullOrBlank()) {
                        must(match("name", request.query))
                    }
                }
            }
        }
        return search
    }

    suspend fun search(sort: String?, request: ContentRequestDTO?): SearchResponse {
        val filterList = getFilterFromRequest(request)

        // client 요청 전송
        val search = client.search("content") {
            // tab 따라 max 설정
            resultSize = 100

            // sort 따라 정렬 기준 설정
            // sort가 있으면 항상 score가 나오지 않음.
            sort {
                getSortFromRequest(sort)
            }

            if (request != null && (!request.query.isNullOrBlank() || !request.filter.isNullOrEmpty())) {
                query = bool {
                    if (filterList.isNotEmpty())
                        filter(filterList)
                    if (!request.query.isNullOrBlank()) {
                        println("AAA")
                        mustNot(TermQuery("name", request.query))
                        should(matchPhrase("synopsis", request.query))
                    }

                }
            }
        }
        return search
    }

    private fun SearchDSL.getSortFromRequest(sort: String?) {
        return sort {
            when (sort) {
                "popularity" -> add("popularity", SortOrder.DESC)
                "new" -> add("firstAirDate", SortOrder.DESC)
                "name" -> add("sortingName", SortOrder.ASC)
                "rating" -> add("rating", SortOrder.DESC)
            }
        }
    }

    private fun getFilterFromRequest(request: ContentRequestDTO?): MutableList<ESQuery> {
        var filterList = mutableListOf<ESQuery>()
        if (request != null && (!request.query.isNullOrBlank() || !request.filter.isNullOrEmpty())) {
            // filter 파싱
            if (request.filter != null) {
                filterList = parseRequestFilter(request.filter)
            }
        }
        return filterList
    }


    private fun parseRequestFilter(filter: List<ContentRequestFilterDetail>): MutableList<ESQuery> {
        val filterList = mutableListOf<ESQuery>()

        for (filterDetail in filter) {
            // 값 중 하나가 비면 스킵
            if (filterDetail.type.isBlank() || filterDetail.value.isEmpty()) continue

            // 타입 별 filter 생성
            when (filterDetail.type) {
                "genre", "platform", "age" -> filterList.add(
                    TermsQuery(
                        filterDetail.type,
                        *filterDetail.value.filterNotNull().toTypedArray()
                    )
                )

                "date", "rating" -> {
                    var t = filterDetail.type
                    if (filterDetail.type == "date")
                        t = "firstAirDate"
                    filterList.add(
                        RangeQuery(t) {
                            if (!filterDetail.value[0].isNullOrBlank())
                                gte = filterDetail.value[0]!!
                            if (filterDetail.value.size > 2 && !filterDetail.value[1].isNullOrBlank())
                                lte = filterDetail.value[1]!!
                        }
                    )
                }
            }
        }
        return filterList
    }


}