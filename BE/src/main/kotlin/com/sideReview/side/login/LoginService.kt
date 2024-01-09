package com.sideReview.side.login

import com.sideReview.side.login.entity.UserInfo
import com.sideReview.side.login.google.dto.GoogleProfileResponse
import com.sideReview.side.login.kakao.dto.KakaoProfileResponse
import com.sideReview.side.login.naver.dto.NaverProfileResponse
import org.springframework.stereotype.Service

@Service
class LoginService(val userInfoRepository: UserInfoRepository, val nicknameService: NicknameService) {
    fun saveUser(type: String, response: Any) {
        var id: String = ""
        var name: String = ""
        when (type) {
            "naver" -> {
                val dto = response as NaverProfileResponse
                id = dto.response.id
                name = nicknameService.makeNickname(0) ?: " "
            }

            "google" -> {
                val dto = response as GoogleProfileResponse
                id = dto.id
                name = nicknameService.makeNickname(2) ?: " "
            }

            "kakao" -> {
                val dto = response as KakaoProfileResponse
                id = "${dto.id}"
                name = nicknameService.makeNickname(1) ?: " "
            }
        }

        userInfoRepository.save(
            UserInfo(
                id,
                type,
                name,
                null,
                null,
                null,
                null
            )
        )
    }
}