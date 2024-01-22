package com.sideReview.side.openSearch

import com.google.gson.Gson
import com.jillesvangurp.ktsearch.SearchResponse
import com.jillesvangurp.searchdsls.querydsl.*
import com.sideReview.side.common.document.ContentDocument
import com.sideReview.side.common.util.MapperUtils
import com.sideReview.side.openSearch.dto.ContentDto
import com.sideReview.side.openSearch.dto.ContentRequestDTO
import com.sideReview.side.openSearch.dto.ContentRequestFilterDetail
import com.sideReview.side.openSearch.dto.DetailContentDto
import kotlinx.coroutines.runBlocking
import org.springframework.stereotype.Service
import java.text.SimpleDateFormat
import java.util.*

@Service
class OpensearchClient(
    val openSearchGetService: OpenSearchGetService,
    val openSearchDetailService: OpenSearchDetailService
) {
    // template
    // 사용 방법 가이드
//    fun findContents() {
//        // SearchResponse 가져오는 단계
//        val request: ContentRequestDTO = ContentRequestDTO(
//            tab = null,
//            sort = null,
//            query = "",
//            notQuery = null,
//            filter = null,
//            pagination = null
//        )
//        val query: (request: ContentRequestDTO) -> ESQuery = (
//
//                )
//        val response: SearchResponse
//        runBlocking {
//            response = openSearchGetService.search("content", request, query)
//        }
//
//        // Response 가공 단계 > 각자 알아서
//    }

    suspend fun getOneContent(id: String, userId: String): DetailContentDto {
        val response: SearchResponse = openSearchDetailService.findDocumentById("content", id)
        val source = response.hits?.hits?.get(0)?.source
        val document = Gson().fromJson("$source", ContentDocument::class.java)

        return openSearchDetailService.getContentDocumentAsDetailContentDto(document, userId)
    }

    fun getContents(request: ContentRequestDTO): List<ContentDto> {
        // SearchResponse 가져오는 단계
        val query: (request: ContentRequestDTO) -> ESQuery = {
            val filterList = getFilterFromRequest(it)
            SearchDSL().bool {
                if (it.filter != null) filter(filterList)
                if (!it.query.isNullOrBlank()) {
                    must(SearchDSL().match("name", it.query))
                }
                if (it.notQuery != null && it.notQuery!!.isNotEmpty()) {
                    mustNot(TermsQuery("id", *it.notQuery!!.toTypedArray()))
                }
            }
        }

        if (request.tab == "main" && request.sort == "popularity") {
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
        } else if (request.tab == "open") {
            // 오늘 날짜 이후만 가져오도록 filter 추가
            if (request.filter.isNullOrEmpty()) request.filter = mutableListOf()
            request.filter!!.add(
                ContentRequestFilterDetail(
                    "date",
                    listOf(
                        Calendar.getInstance().addDate(null, null),
                        ""
                    )
                )
            )
        }


        val contentDtoList: MutableList<ContentDto> = mutableListOf()
        runBlocking {
            val response = openSearchGetService.search("content", request, query)
            val documentList = MapperUtils.parseToContentDocument(response)
            // Response 가공 단계
            for (doc in documentList) {
                val detailContentDto =
                    openSearchDetailService.getContentDocumentAsDetailContentDto(doc, null)

                // detail Content dto -> Content dto
                // contentDtoList.add....
                contentDtoList.add(MapperUtils.mapDetailToContent(detailContentDto))
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
    fun Calendar.addDate(addFun: Int?, addParam: Int?): String {
        this.timeZone = TimeZone.getTimeZone("Asia/Seoul")
        val formatter = SimpleDateFormat("yyyy-MM-dd")
        if (addFun != null && addParam != null)
            this.add(addFun, addParam)
        return formatter.format(this.time).toString()
    }
}