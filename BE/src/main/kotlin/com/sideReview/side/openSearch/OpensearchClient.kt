package com.sideReview.side.openSearch

import com.jillesvangurp.ktsearch.SearchResponse
import com.jillesvangurp.searchdsls.querydsl.*
import com.sideReview.side.common.util.MapperUtils
import com.sideReview.side.openSearch.dto.ContentDto
import com.sideReview.side.openSearch.dto.ContentRequestDTO
import com.sideReview.side.openSearch.dto.ContentRequestFilterDetail
import kotlinx.coroutines.runBlocking
import java.text.SimpleDateFormat
import java.util.*

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

    fun getContents(request: ContentRequestDTO): List<ContentDto> {
        // SearchResponse 가져오는 단계
        val query: (request: ContentRequestDTO) -> ESQuery = {
            val filterList = getFilterFromRequest(it)
            SearchDSL().bool {
                if (request.filter != null) filter(filterList)
                if (!request.query.isNullOrBlank()) {
                    must(SearchDSL().match("name", request.query))
                }
                if (request.notQuery != null && request.notQuery!!.isNotEmpty()) {
                    mustNot(TermsQuery("id", *request.notQuery!!.toTypedArray()))
                }
            }
        }


        val contentDtoList: MutableList<ContentDto> = mutableListOf()
        runBlocking {
            val response = openSearchGetService.search("content", request, query)
            val documentList = MapperUtils.parseToContentDocument(response)
            // Response 가공 단계 > 각자 알아서
            for (doc in documentList) {
                val detailContentDto =
                    openSearchDetailService.getContentDocumentAsDetailContentDto(doc)

                // detail Content dto -> Content dto
                // contentDtoList.add....

            }
        }
        return contentDtoList
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

}