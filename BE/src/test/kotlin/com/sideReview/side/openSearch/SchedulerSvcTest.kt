package com.sideReview.side.openSearch

import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class SchedulerSvcTest @Autowired constructor(val openSearchService: OpenSearchService) {

    @Test
    fun insertTest() {
        runBlocking {
            println("############# insert #############")
            openSearchService.insert()
            println("##################################")
            println("############# get ################")
            openSearchService.get()
            println("##################################")

        }
    }
}
