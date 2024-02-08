package com.sideReview.side.login

import com.sideReview.side.common.dto.UserInfoDto
import com.sideReview.side.common.entity.UserInfo
import com.sideReview.side.common.repository.UserInfoRepository
import com.sideReview.side.login.naver.OAuthAttributes
import org.slf4j.LoggerFactory
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest
import org.springframework.stereotype.Service
import javax.servlet.http.HttpSession

@Service
class Oauth2UserServiceImpl(
    val userInfoRepository: UserInfoRepository,
    val nicknameService: NicknameService,
    private val httpSession: HttpSession
) :
    DefaultOAuth2UserService() {
    val logger = LoggerFactory.getLogger(this::class.java)!!


    override fun loadUser(userRequest: OAuth2UserRequest): CustomOAuth2User {
        // 사용자 정보를 가져오는 로직을 여기에 구현
        val oAuth2User = super.loadUser(userRequest)
        val customOAuth2User = CustomOAuth2User(oAuth2User)

        val registrationId: String = userRequest.clientRegistration.registrationId
        val userNameAttributeName: String =
            userRequest.clientRegistration.providerDetails.userInfoEndpoint.userNameAttributeName
        val attributes =
            OAuthAttributes.of(registrationId, userNameAttributeName, customOAuth2User.attributes)
        // nickname 비었으면 랜덤 생성
        if (attributes.name.isBlank()) {
            val type = when (registrationId) {
                "naver" -> 0
                "kakao" -> 1
                "google" -> 2
                else -> throw LoginRegistrationIdException(
                    "Login Type Invalid. Something Wrong in server."
                )
            }
            attributes.name = nicknameService.makeNickname(type) ?: " "
        }

        val user: UserInfo = saveOrUpdate(attributes)

        httpSession.setAttribute("user", UserInfoDto(user))

        customOAuth2User.setAttributes("user", user)

        return customOAuth2User
    }

    private fun saveOrUpdate(attributes: OAuthAttributes): UserInfo {
        val user = userInfoRepository.findById(attributes.id)
        return if (user.isPresent) {
            if (user.get().nickname != attributes.name) user.get().nickname = attributes.name
            if (user.get().profile != attributes.profile) user.get().profile = attributes.profile
            user.get()
        } else
            userInfoRepository.save(attributes.toEntity())
    }

}