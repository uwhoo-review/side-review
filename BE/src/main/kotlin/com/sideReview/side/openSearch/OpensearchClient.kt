package com.sideReview.side.openSearch

import com.jillesvangurp.ktsearch.SearchResponse
import com.jillesvangurp.searchdsls.querydsl.*
import com.sideReview.side.common.document.ContentDocument
import com.sideReview.side.common.document.PersonDocument
import com.sideReview.side.common.dto.PageInfoDto
import com.sideReview.side.common.util.MapperUtils
import com.sideReview.side.mypage.dto.FavoriteContentSearchDto
import com.sideReview.side.mypage.dto.FavoriteContentSearchPageDto
import com.sideReview.side.mypage.dto.FavoritePersonDetailDto
import com.sideReview.side.mypage.dto.FavoritePersonDto
import com.sideReview.side.openSearch.dto.*
import com.sideReview.side.review.entity.UserStarRating
import kotlinx.coroutines.runBlocking
import org.springframework.stereotype.Service
import java.text.SimpleDateFormat
import java.util.*

@Service
class OpensearchClient(
    val openSearchGetService: OpenSearchGetService,
    val openSearchDetailService: OpenSearchDetailService
) {
    /**
     *  openSearchGetService를 통해 전체 Document 가져온다.
     *  openSearchDetailService를 통해 전체 Document 중 추가로 가져와야 할 정보를 가져온다.
     *                     + 정보를 DetailContent or DetailPerson Dto로 변경한다.
     *  OpensearchClient를 통해 DetailContent or DetailPerson Dto를 필요한 형태로 변환한 후 리턴한다.
     */

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

    fun getOneContent(id: String, userId: String?): DetailContentDto {
        val detailContentDto: DetailContentDto
        runBlocking {
            val response: SearchResponse = openSearchGetService.findDocumentById("content", id)
            val document = MapperUtils.parseToContentDocument(response)[0]

            detailContentDto =
                openSearchDetailService.getContentDocumentAsDetailContentDto(document, userId)
        }
        return detailContentDto
    }

    fun getAllContents(idList: List<String>): List<ContentDocument> {
        val documentList: MutableList<ContentDocument> = mutableListOf()
        runBlocking {
            val response = openSearchGetService.findAllDocumentById("content", idList)
            documentList.addAll(MapperUtils.parseToContentDocument(response))
        }
        return documentList
    }

    fun sumAllContentsGenre(idList: List<String>): List<Int> {
        val genreList: MutableList<Int> = mutableListOf()
        runBlocking {
            val response = openSearchGetService.findAllDocumentById("content", idList)
            val documentList = MapperUtils.parseToContentDocument(response)
            documentList.forEach {
                it.genre?.let { it1 -> genreList.addAll(it1) }
            }
        }
        return genreList
    }

    fun sumAllContentsPeople(
        ratedContentList: List<UserStarRating>
    ): Pair<List<Triple<Int, String, Float>>, List<Triple<Int, String, Float>>> {
        val documentList: MutableList<PersonDocument> = mutableListOf()
        val idRatingMap = ratedContentList.associateBy({ it.targetId }, { it.rating })
        runBlocking {
            val response =
                openSearchGetService.findAllDocumentByContentId(ratedContentList.map { it.targetId })
            documentList.addAll(MapperUtils.parseToPersonDocument(response))
        }
        return parseDirectorAndActor(documentList, idRatingMap)
    }

    fun getOnePerson(id: String): DetailPersonDto {
        val detailPersonDto: DetailPersonDto
        runBlocking {
            val response: SearchResponse = openSearchGetService.findDocumentById("person", id)
            if (response.hits?.hits?.size == 0) throw RuntimeException("The person does not exist in UWHOO database.")
            val document = MapperUtils.parseToPersonDocument(response)[0]

            detailPersonDto = openSearchDetailService.getPersonDocument(document)
        }
        return detailPersonDto
    }

    fun getAllPeople(idList: List<String>): List<PersonDocument> {
        val documentList: MutableList<PersonDocument> = mutableListOf()
        runBlocking {
            val response = openSearchGetService.findAllDocumentById("person", idList)
            documentList.addAll(MapperUtils.parseToPersonDocument(response))
        }
        return documentList
    }

    fun getContents(request: ContentRequestDTO): List<ContentDto> {
        // SearchResponse 가져오는 단계
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
                        Calendar.getInstance().addDate(Calendar.DATE, 1),
                        ""
                    )
                )
            )
        } else if (request.tab == "new") {
            // 오늘 날짜 이전만 가져오도록 filter 추가
            if (request.filter.isNullOrEmpty()) request.filter = mutableListOf()
            request.filter!!.add(
                ContentRequestFilterDetail(
                    "date",
                    listOf(
                        "",
                        Calendar.getInstance().addDate(null, null)
                    )
                )
            )
        }

        val contentDtoList: MutableList<ContentDto> = mutableListOf()
        runBlocking {
            val response = openSearchGetService.search("content", request, ::defaultQuery)
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

    fun getMatchContents(request: ContentRequestDTO): SearchContentDto {
        // SearchResponse 가져오는 단계
        val simpleContentDtoList: MutableList<SimpleContentDto> = mutableListOf()
        var total: Int
        runBlocking {
            val response = openSearchGetService.search("content", request, ::defaultQuery)
            val documentList = MapperUtils.parseToContentDocument(response)
            total = response.hits?.total?.value?.toInt() ?: 0
            // Response 가공 단계
            for (doc in documentList) {
                val detailContentDto =
                    openSearchDetailService.getContentDocumentAsDetailContentDto(doc, null)

                // detail Content dto -> SimpleContent dto
                simpleContentDtoList.add(MapperUtils.mapDetailToSimpleContent(detailContentDto))
            }
        }
        return SearchContentDto(
            total = total,
            content = simpleContentDtoList
        )
    }

    fun getMatchPeople(request: ContentRequestDTO): SearchPersonDto {
        val people: MutableList<PersonDto> = mutableListOf()
        var total: Int
        runBlocking {
            val response =
                openSearchGetService.searchMatch(request.query!!, request.pagination ?: 0, 12)
            total = response.hits?.total?.value?.toInt() ?: 0

            val documentList = MapperUtils.parseToPersonDocument(response)
            for (document in documentList) {
                val detailPersonDto = openSearchDetailService.getPersonDocument(document)
                people.add(MapperUtils.mapDetailToPerson(detailPersonDto))
            }
        }
        return SearchPersonDto(
            total = total,
            content = people
        )
    }

    fun getSimilarContents(request: ContentRequestDTO): SearchContentDto {
        // SearchResponse 가져오는 단계
        val simpleContentDtoList: MutableList<SimpleContentDto> = mutableListOf()
        var total: Int
        runBlocking {
            val response = openSearchGetService.search("content", request)
            val documentList = MapperUtils.parseToContentDocument(response)
            total = response.hits?.total?.value?.toInt() ?: 0
            // Response 가공 단계
            for (doc in documentList) {
                val detailContentDto =
                    openSearchDetailService.getContentDocumentAsDetailContentDto(doc, null)

                // detail Content dto -> SimpleContent dto
                simpleContentDtoList.add(MapperUtils.mapDetailToSimpleContent(detailContentDto))
            }
        }
        return SearchContentDto(
            total = total,
            content = simpleContentDtoList
        )
    }

    fun getContents(query: String, page: Int, size: Int): FavoriteContentSearchPageDto {
        // SearchResponse 가져오는 단계
        val favoriteContentDtoList: MutableList<FavoriteContentSearchDto> = mutableListOf()
        var total: Int
        val totalPages: Int

        runBlocking {
            val response = openSearchGetService.findDocumentByKeyword(query, page, size)
            total = response.hits?.total?.value?.toInt() ?: 0
            totalPages = if (total % size == 0) total / size else total / size + 1

            val documentList = MapperUtils.parseToContentDocument(response)
            // Response 가공 단계
            for (doc in documentList) {
                val detailContentDto =
                    openSearchDetailService.getContentDocumentAsDetailContentDto(doc, null)

                // detail Content dto -> SimpleContent dto
                favoriteContentDtoList.add(MapperUtils.mapDetailTofavoriteContent(detailContentDto))
            }
        }
        return FavoriteContentSearchPageDto(
            content = favoriteContentDtoList,
            pageInfo = PageInfoDto(total, totalPages, page)
        )
    }

    fun getMatchPeople(query: String, page: Int, size: Int): FavoritePersonDto {
        val people: MutableList<FavoritePersonDetailDto> = mutableListOf()
        var total: Int
        var totalPages: Int
        runBlocking {
            val response =
                openSearchGetService.searchMatch(query, (page - 1) * size, size)
            total = response.hits?.total?.value?.toInt() ?: 0
            totalPages = if (total % size == 0) total / size else total / size + 1

            val documentList = MapperUtils.parseToPersonDocument(response)
            for (document in documentList) {
                val detailPersonDto = openSearchDetailService.getPersonDocument(document)
                people.add(MapperUtils.mapDetailToFavoritePersonDetail(detailPersonDto))
            }
        }
        return FavoritePersonDto(
            pageInfo = PageInfoDto(total, totalPages, page),
            person = people
        )
    }

    fun defaultQuery(request: ContentRequestDTO): ESQuery {
        val filterList = getFilterFromRequest(request)
        return SearchDSL().bool {
            if (request.filter != null) filter(filterList)
            if (!request.query.isNullOrBlank()) {
                must(SearchDSL().match("name", request.query))
            }
            if (request.notQuery != null && request.notQuery!!.isNotEmpty()) {
                mustNot(TermsQuery("id", *request.notQuery!!.toTypedArray()))
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
                        if (!filterDetail.value[0].isNullOrBlank())
                            gte = filterDetail.value[0]!!
                        if (filterDetail.value.size == 2 && !filterDetail.value[1].isNullOrBlank())
                            lte = filterDetail.value[1]!!
                    })
                }
            }
        }
        return filterList
    }

    private fun parseDirectorAndActor(
        documentList: List<PersonDocument>, idRatingMap: Map<String, Float>
    ): Pair<List<Triple<Int, String, Float>>, List<Triple<Int, String, Float>>> {
        val actorList: MutableList<Triple<Int, String, Float>> = mutableListOf()
        val directorList: MutableList<Triple<Int, String, Float>> = mutableListOf()

        documentList.forEach {
            val personId = it.id
            val name = it.name
            if (it.cast?.size == 0 && it.crew?.size != 0) {
                val jobMap = it.crew?.map { it.job }
                if (jobMap!!.contains("Directing") || jobMap!!.contains("Production")) {
                    val contentIdList = it.crew!!.map { it.contentId }
                    for (i: Int in 0..contentIdList.size) {
                        val contentId = contentIdList[i]
                        if (idRatingMap.containsKey(contentId))
                            directorList.add(Triple(personId, name, idRatingMap[contentId]!!))
                    }
                }
            } else {
                val contentIdList : MutableList<String> = mutableListOf()
                if (it.cast?.size != 0){
                    val idList = it.cast!!.map { it.contentId }
                    contentIdList.addAll(idList)
                }
                for (element in contentIdList) {
                    if (idRatingMap.containsKey(element)) {
                        val triple =
                            Triple(first = personId, second = name, third = idRatingMap[element]!!)
                        actorList.add(triple)
                        print(triple)
                    }
                }
            }
        }
        return Pair(first = actorList?: emptyList(), second = directorList?: emptyList())
    }

    fun Calendar.addDate(addFun: Int?, addParam: Int?): String {
        this.timeZone = TimeZone.getTimeZone("Asia/Seoul")
        val formatter = SimpleDateFormat("yyyy-MM-dd")
        if (addFun != null && addParam != null)
            this.add(addFun, addParam)
        return formatter.format(this.time).toString()
    }
}