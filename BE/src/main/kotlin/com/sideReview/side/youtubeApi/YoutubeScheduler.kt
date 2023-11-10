package com.sideReview.side.youtubeApi

import lombok.extern.slf4j.Slf4j
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
@Slf4j
class YoutubeScheduler(val service: YoutubeService) {

    @Scheduled(cron = "0 0 0 * * *")
    fun schedule() {
    }
}