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

    fun getCreditInfo(personDocumentList: List<PersonDocument>) : List<PersonDocument>{
        val contentResponse = tmdbClient.findAllTvShows("Bearer $accessKey",1)
        val pages : Int = contentResponse.total_pages
        val contentIdList : MutableList<Int> = mutableListOf()
        val personInfoMap = personDocumentList.associateBy { it.id }

        contentIdList.addAll(contentResponse.results.map { it.id })

        for(page in 2..pages){
            contentIdList.addAll(tmdbClient.findAllTvShows("Bearer $accessKey",page).results.map { it.id })
        }

        for(id in contentIdList){
            val creditDto = filterCredit(tmdbClient.findOneCredit("Bearer $accessKey", id))
            val roleInfoList : MutableList<RoleInfo> = mutableListOf()
            val jobInfoList : MutableList<JobInfo> = mutableListOf()

            creditDto.roleDto?.forEach {
                val foundPersonInfo = personInfoMap[it.personId]
                roleInfoList.add(RoleInfo(it.role, id))
                foundPersonInfo?.apply {
                    if(cast?.isNotEmpty() == true) {
                        roleInfoList.addAll(cast!!)
                        cast = roleInfoList
                    }
                }
            }
        }
        return personDocumentList
    }

    private fun filterCredit(creditResponse: CreditResponse) : CreditDto {
        val roleList : MutableList<RoleDto> = mutableListOf()
        val jobList : MutableList<JobDto> = mutableListOf()

        creditResponse.cast?.forEach {
            it.character?.let { role ->
                roleList.add(RoleDto(role, it.id))
            }
        }

        creditResponse.crew?.forEach {
            it.department?.let { job ->
                jobList.add(JobDto(job, it.id))
            }
        }
        return CreditDto(roleList, jobList)
    }
}