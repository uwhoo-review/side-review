package com.sideReview.side.login

import com.sideReview.side.login.entity.UserInfo
import com.sideReview.side.login.google.dto.GoogleProfileResponse
import com.sideReview.side.login.kakao.dto.KakaoProfileResponse
import com.sideReview.side.login.naver.dto.NaverProfileDetail
import org.springframework.stereotype.Service

@Service
class LoginService(val userInfoRepository: UserInfoRepository) {
    fun saveUser(type: String, response: Any) {
        when (type) {
            "naver" -> {
                val dto = response as NaverProfileDetail
                userInfoRepository.save(
                    UserInfo(
                        dto.id,
                        "naver",
                        dto.nickname,
                        null,
                        null,
                        null,
                        null
                    )
                )
            }

            "google" -> {
                val dto = response as GoogleProfileResponse
                userInfoRepository.save(
                    UserInfo(
                        dto.id,
                        "google",
                        dto.name,
                        null,
                        null,
                        null,
                        null
                    )
                )
            }

            "kakao" -> {
                val dto = response as KakaoProfileResponse
                userInfoRepository.save(
                    UserInfo(
                        "${dto.id}",
                        "kakao",
                        dto.kakao_account.profile.nickname ?: dto.kakao_account.email,
                        null,
                        null,
                        null,
                        null
                    )
                )
            }
        }
    }
}