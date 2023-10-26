package com.sideReview.side.youtube

import com.sideReview.side.youtubeApi.YoutubeClient
import org.junit.jupiter.api.Test
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class YoutubeAPITest(@Autowired private val client: YoutubeClient) {
    private val logger = LoggerFactory.getLogger(this.javaClass)!!

    @Test
    fun getTest() {
        logger.error("시작했다")
        val get = client.getVideoList(maxResults = 500L)
        logger.error(get.toString())
        logger.info("items : " + get.items.toString())
    }
}