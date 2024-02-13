package com.sideReview.side.login

import com.sideReview.side.common.entity.UserInfo
import com.sideReview.side.common.repository.UserInfoRepository
import com.sideReview.side.login.google.dto.GoogleProfileResponse
import com.sideReview.side.login.kakao.dto.KakaoProfileResponse
import com.sideReview.side.login.naver.dto.NaverProfileResponse
import org.springframework.stereotype.Service

@Service
class LoginService(
    val userInfoRepository: UserInfoRepository,
    val nicknameService: NicknameService
) {
    fun saveUser(type: String, response: Any): UserInfo {
        var id: String = ""
        var name: String = ""
        var profile: String = ""
        when (type) {
            "naver" -> {
                val dto = response as NaverProfileResponse
                id = dto.response.id
                name =
                    if (dto.response.nickname.isNullOrBlank()) nicknameService.makeNickname(0) else dto.response.nickname
                profile = dto.response.profile_image
            }

            "google" -> {
                val dto = response as GoogleProfileResponse
                id = dto.id
                name = if (dto.name.isNullOrBlank()) nicknameService.makeNickname(2) else dto.name
                profile = dto.picture
            }

            "kakao" -> {
                val dto = response as KakaoProfileResponse
                id = "${dto.id}"
                name =
                    if (dto.kakao_account.profile.nickname.isNullOrBlank())
                        nicknameService.makeNickname(1)
                    else dto.kakao_account.profile.nickname
                profile = if (dto.kakao_account.profile.thumbnail_image_url.isNullOrBlank()) ""
                else dto.kakao_account.profile.thumbnail_image_url
            }
        }
        val user = userInfoRepository.findById(id)
        return if (user.isPresent) {
            if (user.get().nickname != name) user.get().nickname = name
            if (user.get().profile != profile) user.get().profile = profile
            user.get()
        } else
            userInfoRepository.save(
                UserInfo(
                    id,
                    type,
                    name,
                    profile,
                    null,
                    null,
                    null,
                    null
                )
            )
    }

    fun authenticateUser(id: String, type: String): Boolean {
        return userInfoRepository.existsByUserIdAndLoginType(id, type)
    }
}