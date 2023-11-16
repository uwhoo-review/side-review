package com.sideReview.side.openSearch

import kotlinx.coroutines.runBlocking
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled

@Configuration
@EnableScheduling
class DataInsertScheduler(val openSearchService: OpenSearchService) {

    @Scheduled(cron = "0 0 0 * * *")
    fun insertData() {
        runBlocking {
            kotlin.runCatching {
                openSearchService.insert("content")
            }.onSuccess {
                println("::: Open Search bulk insert success :::")
            }.onFailure { action ->
                println("::: Open Search bulk insert Failed! :::")
                println(action.message)
                println(action.stackTrace)
                println(":::::::::::::::::::::::::::::::::::::")
            }
        }
    }
}