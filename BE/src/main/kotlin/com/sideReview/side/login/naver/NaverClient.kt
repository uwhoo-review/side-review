package com.sideReview.side.login.naver

import org.springframework.cloud.openfeign.FeignClient

@FeignClient(name = "naver", url = "https://nid.naver.com/oauth2.0/authorize")
interface NaverClient {
//ㅔ스트11
}