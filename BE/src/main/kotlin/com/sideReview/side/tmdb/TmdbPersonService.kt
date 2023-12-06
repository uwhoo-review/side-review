package com.sideReview.side.tmdb

import com.google.gson.Gson
import com.sideReview.side.common.document.ContentDocument
import com.sideReview.side.common.document.JobInfo
import com.sideReview.side.common.document.PersonDocument
import com.sideReview.side.common.document.RoleInfo
import com.sideReview.side.common.util.MapperUtil
import com.sideReview.side.tmdb.dto.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.io.File

@Service
class TmdbPersonService @Autowired constructor(private val tmdbClient: TmdbClient) {
    @Value("\${api.tmdb.key}")
    lateinit var accessKey: String
    fun getAllPeople(): List<PersonDocument> {
        val peopleResponse: PeopleResponse = tmdbClient.findAllPeople("Bearer $accessKey", 1)
        //val pages: Int = peopleResponse.total_pages
        val pages: Int = 500
        val dtoList: MutableList<PersonInfo> = mutableListOf()

        dtoList.addAll(peopleResponse.results)

        for (page in 2..pages) {
            dtoList.addAll(tmdbClient.findAllPeople("Bearer $accessKey", page).results)
            //if (page == 100) break;
        }
        return MapperUtil.mapPeopleInfoToDocument(dtoList)
    }

    fun getCreditInfo(personDocumentList: List<PersonDocument>): List<PersonDocument> {
        val contentResponse = tmdbClient.findAllTvShows("Bearer $accessKey", 1)
        //tmdb 페이지 제한에 따라 최대 500으로 설정
        val pages: Int = 500
        val contentIdList: MutableList<String> = mutableListOf()
        val personInfoMap = personDocumentList.associateBy { it.id }

        contentIdList.addAll(contentResponse.results.map { it.id })

        for (page in 2..pages) {
            contentIdList.addAll(
                tmdbClient.findAllTvShows(
                    "Bearer $accessKey",
                    page
                ).results.map { it.id })
        }

        for (id in contentIdList) {
            val creditDto = filterCredit(tmdbClient.findOneCredit("Bearer $accessKey", id))

            creditDto.roleDto?.forEach {
                val roleInfoList: MutableList<RoleInfo> = mutableListOf()
                roleInfoList.add(RoleInfo(it.role, id))

                if (personInfoMap.containsKey(it.personId)) {
                    val preCastList = personInfoMap[it.personId]?.cast
                    if (preCastList != null) {
                        roleInfoList.addAll(preCastList)
                    }
                    personInfoMap[it.personId]?.cast = roleInfoList
                }
            }
            creditDto.jobIDto?.forEach {
                val jobInfoList: MutableList<JobInfo> = mutableListOf()
                jobInfoList.add(JobInfo(it.job, id))

                if (personInfoMap.containsKey(it.personId)) {
                    val preCrewList = personInfoMap[it.personId]?.crew
                    if (preCrewList != null) {
                        jobInfoList.addAll(preCrewList)
                    }
                    personInfoMap[it.personId]?.crew = jobInfoList
                }
            }
        }
        return personInfoMap.values.toList()
    }

    private fun filterCredit(creditResponse: CreditResponse): CreditDto {
        val roleList: MutableList<RoleDto> = mutableListOf()
        val jobList: MutableList<JobDto> = mutableListOf()

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

    //테스트용 메서드
    fun creditToPerson(): Map<Int, PersonDocument> {
        val jsonCredit = File("/home/hyejin/workspace/side/side-review/BE/src/main/resources/credit.txt").readText()
        val jsonPeople = File("/home/hyejin/workspace/side/side-review/BE/src/main/resources/people.txt").readText()

        val creditResponse = Gson().fromJson(jsonCredit, CreditResponse::class.java)
        val peopleInfoList = Gson().fromJson(jsonPeople, PeopleResponse::class.java).results

        val personDocumentList = MapperUtil.mapPeopleInfoToDocument(peopleInfoList)
        val creditDto = filterCredit(creditResponse)


        //val roleInfoList: MutableList<RoleInfo> = mutableListOf()
        //val jobInfoList: MutableList<JobInfo> = mutableListOf()

        val personInfoMap = personDocumentList.associateBy { it.id }

        creditDto.roleDto?.forEach {
            val roleInfoList: MutableList<RoleInfo> = mutableListOf()
            roleInfoList.add(RoleInfo(it.role, "119051"))

            if (personInfoMap.containsKey(it.personId)) {
                val preCastList = personInfoMap[it.personId]?.cast
                if (preCastList != null) {
                    roleInfoList.addAll(preCastList)
                }
                personInfoMap[it.personId]?.cast = roleInfoList.toList()
            }
        }
        creditDto.jobIDto?.forEach {
            val jobInfoList: MutableList<JobInfo> = mutableListOf()
            jobInfoList.add(JobInfo(it.job, "119051"))

            if (personInfoMap.containsKey(it.personId)) {
                val preCrewList = personInfoMap[it.personId]?.crew
                if (preCrewList != null) {
                    jobInfoList.addAll(preCrewList)
                }
                personInfoMap[it.personId]?.crew = jobInfoList.toList()
            }
        }

        return personInfoMap
    }

}