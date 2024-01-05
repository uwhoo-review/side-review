package com.sideReview.side.login.kakao

import org.springframework.cloud.openfeign.FeignClient

@FeignClient(name = "kakao", url = "https://www.googleapis.com")
interface KakaoClient {
}