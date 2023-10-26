package com.sideReview.side.youtubeApi

import com.sideReview.side.youtubeApi.dto.YoutubeVideoDetailResponse
import com.sideReview.side.youtubeApi.dto.YoutubeVideoListResponse
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam

@FeignClient(
    name = "example",
    url = "https://youtube.googleapis.com/youtube/v3",
    configuration = [YoutubeLoggingConfig::class]
)
interface YoutubeClient {
    /*
    * mostPopular 차트에서 데이터 가져오기
    * YoutubeVideoListResponse 생성자에서 드라마만 필터링.
    * */
    @GetMapping("/videos")
    fun getVideoList(
//        @RequestHeader("Authorization", required = true) access_token: String,
        @RequestParam("key") api_key: String = "AIzaSyDhGP_UeMcdyD-LL7iP2nvUK_IQj41G84w",
        @RequestParam("part") part: String = "topicDetails",
        @RequestParam("maxResults") maxResults: Long = 200L,
        @RequestParam("hl") hl: String = "ko",
        @RequestParam("chart") chart: String = "mostPopular",
        @RequestParam("regionCode") regionCode: String = "kr",
        @RequestParam("pageToken") pageToken: String? = null
    ): YoutubeVideoListResponse


    /*
    * getVideoList에서 가져온 데이터의 id를 가지고 detail 겁색
    * */
    @GetMapping("/videos")
    fun getVideoDetail(
        @RequestParam("key") api_key: String = "AIzaSyDhGP_UeMcdyD-LL7iP2nvUK_IQj41G84w",
        @RequestParam("id", required = true) id: List<String>,
        @RequestParam("part") part: String = "snippet",
        @RequestParam("maxResults") maxResults: Long = 200L,
        @RequestParam("hl") hl: String = "ko",
        @RequestParam("regionCode") regionCode: String = "kr",
        @RequestParam("pageToken") pageToken: String? = null
    ): YoutubeVideoDetailResponse
}