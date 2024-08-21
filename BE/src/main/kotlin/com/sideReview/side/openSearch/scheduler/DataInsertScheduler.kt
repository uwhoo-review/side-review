package com.sideReview.side.openSearch.scheduler

import com.sideReview.side.openSearch.OpenSearchSaveService
import kotlinx.coroutines.runBlocking
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.Async
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled

@Configuration
@EnableScheduling
class DataInsertScheduler(val openSearchSaveService: OpenSearchSaveService) {
/*
    @Async
    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    fun insertData() {
        runBlocking {
            kotlin.runCatching {
                openSearchSaveService.insert("content")
            }.onSuccess {
                println("::: Open Search Content Data bulk insert success :::")
            }.onFailure { action ->
                println("::: Open Search Content Data bulk insert Failed! :::")
                println(action.message)
                println(action.stackTrace)
                println(":::::::::::::::::::::::::::::::::::::")
            }
        }
    }
    */
}
