package com.sideReview.side.youtubeApi

import com.jillesvangurp.ktsearch.*
import com.sideReview.side.common.dto.TrendDTO
import kotlinx.coroutines.runBlocking
import lombok.extern.slf4j.Slf4j
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
@Slf4j
class YoutubeScheduler(val service: YoutubeService) {

    /*
    * 주기마다 데이터 수집 및 AWS OpenSearch에 저장
    * */
    @Scheduled(cron = "0 0 0 * * *")
    fun schedule() {
        val data = TrendDTO(service.request())

        val client = SearchClient(
            KtorRestClient(
                https = false,
                user = "uwho",
                password = "Uwho1234!",
                nodes = arrayOf(Node("15.164.189.220", 9200))
            )
        )

        runBlocking {
            client.indexDocument(
                "youtube-test",
                document = data,
                id = data.id,
                refresh = Refresh.WaitFor
            )
        }

    }
}