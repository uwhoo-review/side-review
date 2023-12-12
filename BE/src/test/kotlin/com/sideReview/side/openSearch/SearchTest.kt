package com.sideReview.side.openSearch

import com.sideReview.side.common.util.MapperUtils
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles

@SpringBootTest
@ActiveProfiles("local")
class SearchTest @Autowired constructor(val service: OpenSearchGetService) {
    @Test
    fun sort() {
        runBlocking {
            println("***************** result **************")

            println(service.get("", "", null).toString())
        }
    }

    @Test
    fun paring() {
        runBlocking {
            println("***************** result **************")

            println(MapperUtils.parseToContentDto(service.get("", "", null)))

        }
    }
}