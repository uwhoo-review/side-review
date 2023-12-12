package com.sideReview.side.openSearch

import com.google.gson.Gson
import com.jillesvangurp.ktsearch.SearchClient
import com.jillesvangurp.ktsearch.SearchResponse
import com.jillesvangurp.ktsearch.search
import com.jillesvangurp.searchdsls.querydsl.bool
import com.jillesvangurp.searchdsls.querydsl.match
import com.sideReview.side.common.document.ContentDocument
import com.sideReview.side.common.document.PersonDocument
import com.sideReview.side.openSearch.dto.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class OpenSearchDetailService @Autowired constructor(val client: SearchClient)  {
    private suspend fun findDocumentById(index : String, id: String) : SearchResponse {
        val search = client.search(index) {
            resultSize = 1
            query = bool { must(match("id", id)) }
        }
        return search
    }

    fun makeSeasonInfo(id : String, list : List<String>) : Season {
        var now :Int = 1
        if(id.contains("_")){
            now = id.split("_")[1].toInt()
        }
        return Season(now, list)
    }

    suspend fun getContentDocument(id: String) : DetailContentDto{
        val response: SearchResponse = findDocumentById("content", id)
        val source = response.hits?.hits?.get(0)?.source
        val document = Gson().fromJson(source.toString(), ContentDocument::class.java)
        val seasonList : List<String> = document.season ?: emptyList()

        return DetailContentDto(
            id = document.id,
            name = document.name,
            originalName = document.originalName ?: "",
            originCountry = document.production?.country ?: emptyList(),
            platform = document.platform,
            genre = document.genre,
            firstAirDate = document.firstAirDate,
            synopsis = document.synopsis,
            trailer = document.trailer,
            photo = document.photo,
            poster = document.poster,
            acting = emptyList(),
            crew = emptyList(),
            rating = document.rating,
            age = 0,
            season = makeSeasonInfo(id, seasonList)
        )
    }

    suspend fun getPersonDocument(id: String) : DetailPersonDto {
        val response: SearchResponse = findDocumentById("person", id)

        if(response.hits?.hits?.size == 0) throw RuntimeException("The person does not exist in UWHOO database.");
        //TODO: exception handling

        val source = response.hits?.hits?.get(0)?.source
        val document = Gson().fromJson(source.toString(), PersonDocument::class.java)
        val job: MutableList<String> = mutableListOf()
        val roleList: MutableList<CastItem> = mutableListOf()
        val jobList: MutableList<CrewItem> = mutableListOf()

        if(document.cast != null && document.cast?.size!! > 0) {
            job.add("Acting")
            for(castRole in document.cast!!){
                val content = getContentDocument(castRole.contentId)
                roleList.add(
                    CastItem(
                        contentName = content.name,
                        year = content.firstAirDate?.substring(0, 4)!!.toInt(),
                        contentId = castRole.contentId,
                        platform = content.platform ?: emptyList(),
                        poster = content.poster ?: "",
                        role = castRole.role
                    )
                )
            }
        }
        if(document.crew != null) {
            for (crewJob in document.crew!!) {
                val content = getContentDocument(crewJob.contentId)
                if (!job.contains(crewJob.job)) job.add(crewJob.job)
                jobList.add(
                    CrewItem(
                        contentName = content.name,
                        year = content.firstAirDate?.substring(0, 4)!!.toInt(),
                        contentId = crewJob.contentId,
                        platform = content.platform ?: emptyList(),
                        poster = content.poster ?: "",
                        job = crewJob.job
                    )
                )
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
}