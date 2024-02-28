package com.sideReview.side.openSearch

import com.google.gson.Gson
import com.jillesvangurp.ktsearch.SearchResponse
import com.sideReview.side.common.document.ContentDocument
import com.sideReview.side.common.document.PersonDocument
import com.sideReview.side.common.util.MapperUtils
import com.sideReview.side.common.util.MapperUtils.parseSearchResponseToSimpleContentDto
import com.sideReview.side.mypage.dto.FavoritePersonDetailDto
import com.sideReview.side.openSearch.dto.*
import com.sideReview.side.review.StarRatingService
import com.sideReview.side.review.dto.ReviewDetailDto
import com.sideReview.side.tmdb.dto.SeasonDto
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class OpenSearchDetailService @Autowired constructor(
    private val starRatingService: StarRatingService,
    private val openSearchGetService: OpenSearchGetService
) {
    /*
    * SearchClient에 직접 접근하지 않고 dto 생성에 정보가 더 필요한 경우
    * openSearchGetService를 통해 정보를 불러온 뒤 dto를 채우는 서비스
    * */
    private val logger = LoggerFactory.getLogger(this::class.java)!!

    suspend fun makeSeasonInfo(id: String, list: List<SeasonDto>): Season {
        var now: Int = 1
        if (id.contains("_")) {
            now = id.split("_")[1].toInt()
        }
        return Season(now, list)
    }


    fun filterCreditInfo(
        personList: List<PersonDocument>,
        id: String
    ): Pair<List<Actor>, List<Crew>> {
        val actorList: MutableList<Actor> = mutableListOf()
        val crewList: MutableList<Crew> = mutableListOf()
        for (person in personList) {
            if (person.cast != null) {
                for (cast in person.cast!!)
                    if (cast.contentId == id) {
                        actorList.add(
                            Actor(
                                person.name,
                                person.id.toString(),
                                cast.role,
                                person.profilePath.toString()
                            )
                        )
                    }
            }

            if (person.crew != null) {
                for (crew in person.crew!!)
                    if (crew.contentId == id) {
                        crewList.add(
                            Crew(
                                person.name,
                                person.id.toString(),
                                crew.job,
                                person.profilePath.toString()
                            )
                        )
                    }
            }
        }
        return Pair<List<Actor>, List<Crew>>(actorList, crewList)
    }

    //TODO : 이거 쓰면 된다 영은!
    suspend fun getContentDocumentAsDetailContentDto(
        document: ContentDocument,
        userId: String?
    ): DetailContentDto {
        val seasonList: MutableList<SeasonDto> = getSeasonFromDocument(document)
        val id = document.id
        val personList =
            MapperUtils.parseToPersonDocument(openSearchGetService.findDocumentByContentId(id))
        val credit = filterCreditInfo(personList, id)

        return DetailContentDto(
            id = document.id,
            name = document.name,
            originalName = document.originalName ?: "",
            originCountry = document.production?.country ?: emptyList(),
            platform = document.platform,
            genre = document.genre,
            date = document.firstAirDate ?: "",
            synopsis = document.synopsis,
            trailer = document.trailer,
            photo = document.photo,
            poster = document.poster,
            actors = credit.first,
            crew = credit.second,
            rating = starRatingService.getRating(
                document.rating?.toFloat(),
                id,
                userId
            ),
            age = if (!document.age.isNullOrBlank()) document.age!!.toString() else "ALL",
            season = makeSeasonInfo(id, seasonList),
            directors = document.directors,
            episodeCnt = document.episodeCount,
            review = ReviewDetailDto()
        )
    }

    suspend fun getSeasonFromDocument(
        document: ContentDocument
    ): MutableList<SeasonDto> {
        var season = document.season
        val seasonInfoList: MutableList<SeasonDto> = mutableListOf()

        if (document.id.contains("_")) {
            val firstSeasonResponse: SearchResponse =
                openSearchGetService.findDocumentById("content", document.id.split("_")[0])
            val firstSeasonSource = firstSeasonResponse.hits?.hits?.get(0)?.source
            val firstSeasonDocument =
                Gson().fromJson("$firstSeasonSource", ContentDocument::class.java)
            season = firstSeasonDocument.season
        }
        seasonInfoList.addAll(season.map { SeasonDto(it) })
        return seasonInfoList
    }

    suspend fun getPersonDocument(document: PersonDocument): DetailPersonDto {
        val job: MutableList<String> = mutableListOf()
        val roleList: MutableList<CastItem> = mutableListOf()
        val jobList: MutableList<CrewItem> = mutableListOf()

        if (document.cast != null && document.cast?.size!! > 0) {
            job.add("Acting")
            for (castRole in document.cast!!) {
                val content = parseSearchResponseToSimpleContentDto(
                    openSearchGetService.findDocumentById(
                        "content",
                        castRole.contentId
                    )
                )
                if (content != null)
                    roleList.add(
                        CastItem(
                            contentName = content.name,
                            date = content.date,
                            contentId = castRole.contentId,
                            platform = content.platform ?: emptyList(),
                            poster = content.poster ?: "",
                            role = castRole.role
                        )
                    )
            }
        }
        if (document.crew != null) {
            for (crewJob in document.crew!!) {
                val content = parseSearchResponseToSimpleContentDto(
                    openSearchGetService.findDocumentById(
                        "content",
                        crewJob.contentId
                    )
                )
                if (content != null) {
                    if (!job.contains(crewJob.job)) job.add(crewJob.job)
                    jobList.add(
                        CrewItem(
                            contentName = content.name,
                            date = content.date,
                            contentId = crewJob.contentId,
                            platform = content.platform ?: emptyList(),
                            poster = content.poster ?: "",
                            job = crewJob.job
                        )
                    )
                }
            }
        }

        return DetailPersonDto(
            id = document.id,
            name = document.name,
            job = job,
            profilePath = document.profilePath,
            cast = roleList ?: emptyList(),
            crew = jobList ?: emptyList()
        )

    }

    suspend fun fillCastCrew(matchPersonDto: List<PersonDto>): List<FavoritePersonDetailDto> {
        val detail: MutableList<FavoritePersonDetailDto> = mutableListOf()
        for (person in matchPersonDto) {
            val content: MutableSet<String> = mutableSetOf()
            if (person.cast != null) {
                content.addAll(getNames(person.cast.map { it.contentId }))
            }
            if (person.crew != null) {
                content.addAll(getNames(person.crew.map { it.contentId }))
            }

            detail.add(
                FavoritePersonDetailDto(
                    person.id,
                    person.name,
                    person.profilePath,
                    content.toList(),
                    emptyList()
                )
            )
        }
        return detail
    }

    private suspend fun getNames(ids: List<String>): List<String> {
        val response: SearchResponse? =
            kotlin.runCatching {
                openSearchGetService.findContentByIdSortByFirstAirDate(ids)
            }.getOrNull()
        return if (response != null) {
            val contents: List<ContentDocument> =
                MapperUtils.parseToContentDocument(response)
            contents.map { it.name }
        } else emptyList()
    }
}