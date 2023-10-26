package com.sideReview.side.youtubeApi

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class YoutubeService(val client: YoutubeClient) {
    private val logger = LoggerFactory.getLogger(this.javaClass)!!

    fun request() {
        val target = client.getVideoList(maxResults = 500L)

        logger.info(target.items.toString())

        val detail = client.getVideoList(part = "snippet")
    }
}