package com.sideReview.side.youtubeApi

import com.sideReview.side.youtubeApi.dto.YoutubeVideoDetailResponse
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class YoutubeService(val client: YoutubeClient) {
    private val logger = LoggerFactory.getLogger(this.javaClass)!!
    private val routine: Int = 5;

    /*
    * Youtube Drama 검색 결과를 가져옴.
    * 1. videoList를 가져와서 필터링 > routine번 진행
    * 2. id를 가지고 detail 검색 후 return
    * */
    fun request(): YoutubeVideoDetailResponse {
        var target: MutableList<String> = mutableListOf()
        var pageToken: String? = null
        // routine만큼 반복해서 popular 중 drama 정보 get
        for (i in 0..routine) {
            val response = client.getVideoList(maxResults = 500L, pageToken = pageToken)
            pageToken = response.nextPageToken
            target.addAll(response.items.map { it.id })
        }
        return client.getVideoDetail(id = target)
    }
}