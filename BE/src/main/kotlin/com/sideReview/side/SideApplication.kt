package com.sideReview.side

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.openfeign.EnableFeignClients

@SpringBootApplication
@EnableFeignClients(basePackages = ["com.sideReview.side.youtubeApi"])
class SideApplication

fun main(args: Array<String>) {
    runApplication<SideApplication>(*args)
}
