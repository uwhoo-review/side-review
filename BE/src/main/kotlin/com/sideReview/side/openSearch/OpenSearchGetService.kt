package com.sideReview.side.openSearch

import com.jillesvangurp.ktsearch.SearchClient
import com.jillesvangurp.ktsearch.SearchResponse
import com.jillesvangurp.ktsearch.search
import com.jillesvangurp.searchdsls.querydsl.*
import com.sideReview.side.openSearch.dto.ContentRequestDTO
import com.sideReview.side.openSearch.dto.ContentRequestFilterDetail
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.text.SimpleDateFormat
import java.util.*

@Service
class OpenSearchGetService @Autowired constructor(val client: SearchClient) {

    suspend fun get(tab: String, sort: String?, request: ContentRequestDTO): SearchResponse {

        if (tab == "main" && sort == "popularity") {
            // 최근 1년간의 결과만 가져오기 위해 filter 추가
            if (request.filter.isNullOrEmpty()) request.filter = mutableListOf()
            request.filter!!.add(
                ContentRequestFilterDetail(
                    "date",
                    listOf(
                        Calendar.getInstance().addDate(Calendar.YEAR, -1),
                        Calendar.getInstance().addDate(null, null)
                    )
                )
            )
        }
        // client 요청 전송
        return client.search(
            "content", block = createBlock(sort, request, ::makeGetQuery, tab)
        )
    }

    suspend fun search(sort: String?, request: ContentRequestDTO?): SearchResponse {
        // client 요청 전송
        return client.search(
            "content",
            block = createBlock(sort, request, ::makeSearchQuery)
        )
    }

    private fun createBlock(
        sort: String?,
        request: ContentRequestDTO?,
        queryBlock: (request: ContentRequestDTO) -> ESQuery,
        tab: String = "search"
    ): SearchDSL.() -> Unit = {
        // tab 따라 max 설정
        when (tab) {
            "main" -> resultSize = 20
            "popularity", "new", "sortFilter" -> resultSize = 30
            "search" -> resultSize = 12
        }

        // sort 따라 정렬 기준 설정
        // sort가 있으면 항상 score가 나오지 않음.
        parseSort(sort)

        // request가 있을 경우 세부 쿼리와 pagination 추가
        if (request != null) {
            // filter와 query검색
            if (!request.query.isNullOrBlank() || !request.filter.isNullOrEmpty()) {
                query = queryBlock(request)
            }

            // pagination search_after
            if (request.pagination != null) {
                from = request.pagination
            }
        }
    }

    private fun SearchDSL.parseSort(sort: String?) {
        if (!sort.isNullOrBlank()) {
            sort {
                when (sort) {
                    "popularity" -> add("popularity", SortOrder.DESC)
                    "new" -> add("firstAirDate", SortOrder.DESC)
                    "name" -> add("sortingName", SortOrder.ASC)
                    "rating" -> add("rating", SortOrder.DESC)
                }
            }
        }
    }

    private fun makeGetQuery(request: ContentRequestDTO): ESQuery {
        val filterList = getFilterFromRequest(request)

        return SearchDSL().bool {
            if (request.filter != null) filter(filterList)
            if (!request.query.isNullOrBlank()) {
                must(SearchDSL().match("name", request.query))
            }
        }
    }

    private fun makeSearchQuery(request: ContentRequestDTO): ESQuery {
        val filterList = getFilterFromRequest(request)

        return SearchDSL().bool {
            if (filterList.isNotEmpty()) filter(filterList)
            if (!request.query.isNullOrBlank()) {
                mustNot(SearchDSL().match("name", request.query))
                should(SearchDSL().multiMatch(
                    request.query,
                    "synopsis",
                    "production.company",
                    "production.country"
                ) {
                    minimumShouldMatch = "1"
                })
            }
        }
    }

    private fun getFilterFromRequest(request: ContentRequestDTO): MutableList<ESQuery> {
        var filterList = mutableListOf<ESQuery>()
        if (!request.query.isNullOrBlank() || !request.filter.isNullOrEmpty()) {
            // filter 파싱
            if (request.filter != null) {
                filterList = parseFilter(request.filter!!)
            }
        }
        return filterList
    }


    private fun parseFilter(filter: List<ContentRequestFilterDetail>): MutableList<ESQuery> {
        val filterList = mutableListOf<ESQuery>()

        for (filterDetail in filter) {
            // 값 중 하나가 비면 스킵
            if (filterDetail.type.isBlank() || filterDetail.value.isEmpty()) continue

            // 타입 별 filter 생성
            when (filterDetail.type) {
                "genre", "platform", "age" -> filterList.add(
                    TermsQuery(
                        filterDetail.type, *filterDetail.value.filterNotNull().toTypedArray()
                    )
                )

                "date", "rating" -> {
                    var t = filterDetail.type
                    if (filterDetail.type == "date") t = "firstAirDate"
                    filterList.add(RangeQuery(t) {
                        if (!filterDetail.value[0].isNullOrBlank()) gte = filterDetail.value[0]!!
                        if (filterDetail.value.size > 2 && !filterDetail.value[1].isNullOrBlank()) lte =
                            filterDetail.value[1]!!
                    })
                }
            }
        }
        return filterList
    }

    fun Calendar.addDate(addFun: Int?, addParam: Int?): String {
        this.timeZone = TimeZone.getTimeZone("Asia/Seoul")
        val formatter = SimpleDateFormat("yyyy-MM-dd")
        if (addFun != null && addParam != null)
            this.add(addFun, addParam)
        return formatter.format(this.time).toString()
    }
}