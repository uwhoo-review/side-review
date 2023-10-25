package com.sideReview.side.youtubeApi

import lombok.RequiredArgsConstructor
import lombok.extern.slf4j.Slf4j
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
@RequiredArgsConstructor
@Slf4j
class youtubeScheduler(val service: youtubeService) {

    @Scheduled(cron = "0 0 0 * * *")
    fun schedule() {
    }
}