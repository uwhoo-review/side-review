package com.sideReview.side.tmdb

import com.sideReview.side.common.document.JobInfo
import com.sideReview.side.common.document.PersonDocument
import com.sideReview.side.common.document.RoleInfo
import com.sideReview.side.common.util.MapperUtil
import com.sideReview.side.tmdb.dto.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class TmdbPersonService @Autowired constructor(private val tmdbClient: TmdbClient) {
    @Value("\${api.tmdb.key}")
    lateinit var accessKey: String
    fun getAllPeople() : List<PersonDocument>{
        val peopleResponse : PeopleResponse = tmdbClient.findAllPeople("Bearer $accessKey",1)
        val pages : Int = peopleResponse.total_pages
        val dtoList : MutableList<PersonInfo> = mutableListOf()

        for(page in 2 ..pages){
            dtoList.addAll(tmdbClient.findAllPeople("Bearer $accessKey",page).results)
            if(page == 100) break;
        }
        return MapperUtil.mapPeopleInfoToDocument(dtoList)
    }

    private fun filterCredit(creditResponse: CreditResponse) : CreditDto {
        val roleList : MutableList<RoleInfo> = mutableListOf()
        val jobList : MutableList<JobInfo> = mutableListOf()

        creditResponse.cast?.forEach {
            it.character?.let { role ->
                roleList.add(RoleInfo(role, creditResponse.id))
            }
        }

        creditResponse.crew?.forEach {
            it.department?.let { job ->
                jobList.add(JobInfo(job, creditResponse.id))
            }
        }
        return CreditDto(roleList, jobList)
    }
}