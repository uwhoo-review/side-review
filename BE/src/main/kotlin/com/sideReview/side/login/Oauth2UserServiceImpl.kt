package com.sideReview.side.login

import com.sideReview.side.common.entity.UserInfo
import com.sideReview.side.common.repository.UserInfoRepository
import com.sideReview.side.login.naver.OAuthAttributes
import org.slf4j.LoggerFactory
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrNull

@Service
class Oauth2UserServiceImpl(
    val userInfoRepository: UserInfoRepository,
    val nicknameService: NicknameService
) :
    DefaultOAuth2UserService() {
    val logger = LoggerFactory.getLogger(this::class.java)!!


    override fun loadUser(userRequest: OAuth2UserRequest): CustomOAuth2User {
        // 사용자 정보를 가져오는 로직을 여기에 구현
        logger.info("login load user function 실행")
        logger.info(userRequest.additionalParameters.keys.toString())
        logger.info(userRequest.additionalParameters.values.toString())
        logger.info(
            userRequest.clientRegistration.providerDetails.userInfoEndpoint
                .userNameAttributeName
        )
        // 예시: GitHub에서 사용자 정보를 가져올 때
        val oAuth2User = super.loadUser(userRequest)
        val customOAuth2User = CustomOAuth2User(oAuth2User)

        val registrationId: String = userRequest.clientRegistration.registrationId
        val userNameAttributeName: String =
            userRequest.clientRegistration.providerDetails.userInfoEndpoint.userNameAttributeName
        logger.info("########## 로그인 로직 체크용 로그 attributes ############")
        val attributes =
            OAuthAttributes.of(registrationId, userNameAttributeName, customOAuth2User.attributes)
        logger.info(attributes.toString())

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

        val user: UserInfo = saveOrPass(attributes)

        customOAuth2User.setAttributes("user", user)

        logger.info("########## 로그인 로직 체크용 로그 ############")
        logger.info(user.userId)
        logger.info(user.loginType)
        logger.info(user.nickname)
        logger.info(user.profile)
        logger.info(user.preferOtt)
        logger.info(user.preferGenre)
        logger.info(oAuth2User.attributes.keys.toString())
        logger.info(oAuth2User.attributes.values.toString())

        return customOAuth2User
    }

    private fun saveOrPass(attributes: OAuthAttributes): UserInfo {
        return userInfoRepository.findById(attributes.id).getOrNull()
            ?: userInfoRepository.save(attributes.toEntity())
    }

}