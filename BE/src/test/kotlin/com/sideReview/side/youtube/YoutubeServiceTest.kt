package com.sideReview.side.youtube

import com.sideReview.side.youtubeApi.YoutubeService
import org.junit.jupiter.api.Test
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class YoutubeServiceTest(@Autowired private val service: YoutubeService) {
    private val logger = LoggerFactory.getLogger(this.javaClass)!!

    @Test
    fun serviceTest() {
        logger.error("YoutubeService 시작")
        logger.info("** result : " + service.request().toString())
    }
}