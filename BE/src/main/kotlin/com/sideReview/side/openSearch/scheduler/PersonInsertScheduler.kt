package com.sideReview.side.openSearch.scheduler

import com.sideReview.side.openSearch.OpenSearchSaveService
import kotlinx.coroutines.runBlocking
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.Async
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled

@Configuration
@EnableScheduling
class PersonInsertScheduler(val openSearchSaveService: OpenSearchSaveService) {
    /*
    @Async
    @Scheduled(cron = "0 0 0 ? * MON", zone = "Asia/Seoul")
    fun insertData() {
        runBlocking {
            kotlin.runCatching {
                openSearchSaveService.insert("person")
            }.onSuccess {
                println("::: Open Search Person Data insert success :::")
            }.onFailure { action ->
                println("::: Open Search Person Data insert Failed! :::")
                println(action.message)
                println(action.stackTrace)
                println(":::::::::::::::::::::::::::::::::::::")
            }
        }
    }
    */
}
