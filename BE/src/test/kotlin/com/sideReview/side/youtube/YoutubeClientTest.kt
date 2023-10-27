package com.sideReview.side.youtube

import com.sideReview.side.youtubeApi.YoutubeClient
import org.junit.jupiter.api.Test
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class YoutubeClientTest(@Autowired private val client: YoutubeClient) {
    private val logger = LoggerFactory.getLogger(this.javaClass)!!

    @Test
    fun getTest() {
        logger.error("getTest 시작")
        val get = client.getVideoList(maxResults = 500L)
        logger.error(get.toString())
        logger.info("items : " + get.items.toString())

        // 다음 페이지
        val get2 = client.getVideoList(pageToken = get.nextPageToken)
        logger.info(get2.toString())
    }

    @Test
    fun idSearchTest() {
        logger.error("nullIdListTest 시작")
        val get = client.getVideoDetail(id = listOf("ZRyiyAggeDM"))
        logger.error(get.toString())
        logger.info("items : " + get.items.toString())
    }
}