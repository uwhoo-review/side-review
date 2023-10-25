package com.sideReview.side.youtubeApi

import com.sideReview.side.youtubeApi.dto.YoutubeResponse
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestParam

@FeignClient(
    name = "example",
    url = "https://youtube.googleapis.com/youtube/v3",
    configuration = [YoutubeLoggingConfig::class]
)
interface YoutubeClient {
    @GetMapping("/videos")
    fun getVideoList(
        @RequestHeader("Authorization", required = true) access_token: String,
        @RequestParam("key") api_key: String = "AIzaSyDhGP_UeMcdyD-LL7iP2nvUK_IQj41G84w",
        @RequestParam("part") part: String = "topicDetails",
        @RequestParam("maxResults") maxResults: Long = 200L,
        @RequestParam("hl") hl: String = "ko",
        @RequestParam("chart") chart: String = "mostPopular",
        @RequestParam("regionCode") regionCode: String = "kr"
    ): YoutubeResponse
}