package com.sideReview.side.tmdb

import com.sideReview.side.tmdb.document.JobInfo
import com.sideReview.side.tmdb.document.RoleInfo
import com.sideReview.side.tmdb.dto.CreditDto
import com.sideReview.side.tmdb.dto.CreditResponse
import org.springframework.beans.factory.annotation.Autowired

class TmdbPersonService @Autowired constructor(private val tmdbClient: TmdbClient) {
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