package com.sideReview.side.names.scheduler

import com.sideReview.side.tmdb.TmdbPersonService
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled

@Configuration
@EnableScheduling
class NameScheduler (val personService: TmdbPersonService){
    @Scheduled(cron = "0 0 0 ? * SUN", zone = "Asia/Seoul")
    fun insertData() {
        personService.savePersonNames()
        println("::: Person Name Data insert completed! :::")
    }
}