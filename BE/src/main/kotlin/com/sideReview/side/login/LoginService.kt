package com.sideReview.side.login

import com.sideReview.side.login.google.dto.GoogleProfileResponse
import com.sideReview.side.login.kakao.dto.KakaoProfileResponse
import com.sideReview.side.login.naver.dto.NaverProfileDetail
import org.springframework.stereotype.Service

@Service
class LoginService() {
    fun saveUser(type: String, response: Any) {
        when (type) {
            "naver" -> {
                val dto = response as NaverProfileDetail

            }

            "google" -> {
                val dto = response as GoogleProfileResponse

            }

            "kakao" -> {
                val dto = response as KakaoProfileResponse

            }
        }
    }
}