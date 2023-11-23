package com.sideReview.side.openSearch

import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles

@SpringBootTest
@ActiveProfiles("local")
class SchedulerSvcTest @Autowired constructor(val openSearchSaveService: OpenSearchSaveService) {

    @Test
    fun contentInsertTest() {
        runBlocking {
            println("############# insert #############")
            openSearchSaveService.insert("content")
            println("##################################")
            println("############# get ################")
            openSearchSaveService.get("content")
            println("##################################")
        }
    }

    @Test
    fun personInsertTest() {
        runBlocking {
            println("############# insert #############")
            openSearchSaveService.insert("person")
            println("##################################")
            println("############# get ################")
            openSearchSaveService.get("person")
            println("##################################")
        }
    }
}
