package com.sideReview.side.tmdb

import com.sideReview.side.common.document.JobInfo
import com.sideReview.side.common.document.PersonDocument
import com.sideReview.side.common.document.RoleInfo
import com.sideReview.side.common.util.MapperUtils
import com.sideReview.side.names.NamesRepository
import com.sideReview.side.names.entity.Names
import com.sideReview.side.tmdb.dto.*
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class TmdbPersonService @Autowired constructor(
    private val tmdbClient: TmdbClient,
    private val tmdbContentService: TmdbContentService,
    private val namesRepository: NamesRepository
) {
    @Value("\${api.tmdb.key}")
    lateinit var accessKey: String
    private val logger = LoggerFactory.getLogger(this.javaClass)!!
    fun getAllPeople(): List<PersonDocument> {
        val peopleResponse: PeopleResponse = tmdbClient.findAllPeople("Bearer $accessKey", 1)
        //val pages: Int = peopleResponse.total_pages
        val pages: Int = 500
        var dtoList: MutableList<PersonInfo> = mutableListOf()

        dtoList.addAll(peopleResponse.results)

        for (page in 2..pages) {
            dtoList.addAll(tmdbClient.findAllPeople("Bearer $accessKey", page).results)
        }

        dtoList.forEach {
            val koreanName = convertIdToKorean(it.id)
            if (koreanName != null && koreanName != "")
                it.name = convertIdToKorean(it.id) ?: it.name
        }

        return MapperUtils.mapPeopleInfoToDocument(dtoList)
    }

    fun getCreditInfo(personDocumentList: List<PersonDocument>): List<PersonDocument> {
        val contentIdList = tmdbContentService.getAllContents().map { it.id }
        val personInfoMap = personDocumentList.associateBy { it.id }

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

    @Transactional
    fun savePersonNames() {
        getAllPeople().forEach {
            try {
                val personResponse: PeopleDetailResponse = tmdbClient.findOnePerson("Bearer $accessKey", it.id)
                namesRepository.save(
                    Names(
                        personResponse.id, filterKorean(personResponse.also_known_as), personResponse.name
                    )
                )
            } catch (e: Exception) {
                logger.info("An error occurred during person dictionary processing - $it.id")
            }
        }
    }

    private fun filterKorean(strings: List<String>): String {
        val koreanRegex = "[가-힣]".toRegex()
        var koreanName = ""

        for (str in strings) {
            if (koreanRegex.containsMatchIn(str)) {
                koreanName = str
            }
        }

        return koreanName
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

    private fun convertIdToKorean(id: Int): String? {
        var name: String? = null
        var englishName: String? = null
        try {
            val entity = namesRepository.findById(id).get()
            name = entity.koreanName
            englishName = entity.englishName
        } catch (e: Exception) {
            logger.info("No Such person - $id")
        }
        return name ?: englishName
    }
}