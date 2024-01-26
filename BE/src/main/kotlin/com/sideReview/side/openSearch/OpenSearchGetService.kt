package com.sideReview.side.openSearch

import com.jillesvangurp.ktsearch.SearchClient
import com.jillesvangurp.ktsearch.SearchResponse
import com.jillesvangurp.ktsearch.search
import com.jillesvangurp.searchdsls.querydsl.*
import com.sideReview.side.common.document.PersonDocument
import com.sideReview.side.openSearch.dto.ContentRequestDTO
import com.sideReview.side.openSearch.dto.ContentRequestFilterDetail
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class OpenSearchGetService @Autowired constructor(val client: SearchClient) {

    /*
    * 직접 SearchClient를 통해 OpenSearch에 접근하여 데이터를 가져온다.
    * */
    suspend fun search(sort: String?, request: ContentRequestDTO): SearchResponse {
        // client 요청 전송
        return client.search(
            "content",
            block = createBlock(sort, request, ::makeSearchQuery)
        )
    }

    suspend fun search(
        target: String,
        request: ContentRequestDTO,
        block: (request: ContentRequestDTO) -> ESQuery
    ): SearchResponse {
        return client.search(target, block = createBlock(request.sort, request, block))
    }

    private fun createBlock(
        sort: String?,
        request: ContentRequestDTO,
        queryBlock: (request: ContentRequestDTO) -> ESQuery,
    ): SearchDSL.() -> Unit = {
        // tab 따라 max 설정
        when (request.tab) {
            "main" -> resultSize = 20
            "popularity", "new", "sortFilter" -> resultSize = 30
            "search" -> resultSize = 12
        }

        // sort 따라 정렬 기준 설정
        // sort가 있으면 항상 score가 나오지 않음.
        parseSort(sort)

        // request가 있을 경우 세부 쿼리와 pagination 추가
        // filter와 query검색
        if (!request.query.isNullOrBlank() || !request.filter.isNullOrEmpty()) {
            query = queryBlock(request)
        }

        // pagination search_after
        if (request.pagination != null) {
            from = request.pagination!!
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

    //TODO : 쿼리 만들때 사용 #covention
//    private fun makeGetQuery(request: ContentRequestDTO): ESQuery {
//        val filterList = getFilterFromRequest(request)
//
//        return SearchDSL().bool {
//            if (request.filter != null) filter(filterList)
//            if (!request.query.isNullOrBlank()) {
//                must(SearchDSL().match("name", request.query))
//            }
//            if (request.notQuery != null && request.notQuery!!.isNotEmpty()) {
//                mustNot(TermsQuery("id", *request.notQuery!!.toTypedArray()))
//            }
//        }
//    }

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

    suspend fun findDocumentById(index: String, id: String): SearchResponse {
        val search = client.search(index) {
            resultSize = 1
            query = bool { must(match("id", id)) }
        }
        return search
    }

    suspend fun findAllDocumentById(index: String, idList: List<String>): SearchResponse {
        val search = client.search(index) {
            resultSize = idList.size
            query = bool {
                must(terms("id", *idList.toTypedArray()))
            }
        }
        return search
    }

    suspend fun findDocumentByKeyword(keyword: String, page: Int, size: Int): SearchResponse {
        val search = client.search("content") {
            from = page * size - size
            resultSize = size
            query = bool {
                must(
                    match("name", keyword)
                )
            }
        }
        return search
    }

    suspend fun findDocumentByContentId(id: String): SearchResponse {
        return client.search("person") {
            query = bool {
                should(
                    match("cast.contentId", id),
                    match("crew.contentId", id)
                )
            }
        }
    }

    suspend fun findAllDocumentByContentId(idList: List<String>): SearchResponse {
        return client.search("person") {
            query = bool {
                should(
                    terms("cast.contentId", *idList.toTypedArray()),
                    terms("crew.contentId", *idList.toTypedArray())
                )
            }
        }
    }


    suspend fun findContentByIdSortByFirstAirDate(
        id: List<String>
    ): SearchResponse {
        val search = client.search("content") {
            resultSize = 1
            query = bool { must(terms("id", *id.toTypedArray())) }
            sort { add("firstAirDate", SortOrder.DESC) }
        }
        return search
    }

    suspend fun findDirectorByContentId(id: String): SearchResponse {
        return client.search("person") {
            query = bool {
                must(
                    match("crew.contentId", id),
                    match("crew.job", "Production")
                )
            }
        }
    }

    suspend fun getPerson(id: String): SearchResponse {
        return client.search("person") {
            query = match(PersonDocument::id, id)
        }
    }

    suspend fun searchMatch(name: String, page: Int, size: Int): SearchResponse {
        return client.search("person") {
            query = match(PersonDocument::name, name)
            resultSize = size
            from = page
        }
    }

}