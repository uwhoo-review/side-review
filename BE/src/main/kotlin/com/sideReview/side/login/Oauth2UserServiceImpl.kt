package com.sideReview.side.login

import com.sideReview.side.common.entity.UserInfo
import com.sideReview.side.common.repository.UserInfoRepository
import com.sideReview.side.login.naver.OAuthAttributes
import org.slf4j.LoggerFactory
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrNull

@Service
class Oauth2UserServiceImpl(val userInfoRepository: UserInfoRepository) :
    DefaultOAuth2UserService() {
    val logger = LoggerFactory.getLogger(this::class.java)!!


    override fun loadUser(userRequest: OAuth2UserRequest): OAuth2User {
        // 사용자 정보를 가져오는 로직을 여기에 구현
        // 예시: GitHub에서 사용자 정보를 가져올 때
        val oAuth2User = super.loadUser(userRequest)

        val registrationId: String = userRequest.clientRegistration.registrationId
        val userNameAttributeName: String =
            userRequest.clientRegistration.providerDetails.userInfoEndpoint.userNameAttributeName
        val attributes =
            OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.attributes)
        val user: UserInfo = saveOrPass(attributes)
        oAuth2User.attributes["userInfo"] = user
        logger.info("########## 로그인 로직 체크용 로그 ############")
        logger.info(user.toString())
        logger.info(oAuth2User.toString())
        return oAuth2User
    }

    private fun saveOrPass(attributes: OAuthAttributes): UserInfo {
        return userInfoRepository.findById(attributes.id).getOrNull()
            ?: userInfoRepository.save(attributes.toEntity())
    }

}