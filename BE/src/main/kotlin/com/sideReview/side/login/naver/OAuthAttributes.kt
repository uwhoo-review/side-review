package com.sideReview.side.login.naver

import com.sideReview.side.common.entity.UserInfo
import lombok.Getter
import org.slf4j.LoggerFactory
import javax.security.auth.login.LoginException


@Getter
class OAuthAttributes(
    private val attributes: Map<String, Any>,
    private val nameAttributeKey: String,
    private val loginType: String,
    val id: String,
    val name: String,
) {
    companion object {
        fun of(
            registrationType: String,
            userNameAttributeName: String,
            attributes: Map<String, Any>
        ): OAuthAttributes {
            return when (registrationType) {
                "google" ->
                    ofGoogle(userNameAttributeName, attributes, registrationType)

                "naver" ->
                    ofNaver(userNameAttributeName, attributes, registrationType)

                "kakao" ->
                    ofKakao(userNameAttributeName, attributes, registrationType)

                else -> throw LoginException("login registration type is invalid")
            }

        }

        private fun ofKakao(
            userNameAttributeName: String,
            attributes: Map<String, Any>,
            registrationType: String
        ): OAuthAttributes {
            val response = attributes["response"] as Map<*, *>
            val logger = LoggerFactory.getLogger(this::class.java)!!
            logger.info(attributes.keys.toString())
            logger.info(attributes.values.toString())
            return OAuthAttributesBuilder()
                .id(response["id"] as String)
                .name(response["name"] as String)
                .loginType(registrationType)
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build()
        }

        private fun ofNaver(
            userNameAttributeName: String,
            attributes: Map<String, Any>,
            registrationType: String
        ): OAuthAttributes {
            val response = attributes["response"] as Map<*, *>
            val logger = LoggerFactory.getLogger(this::class.java)!!
            logger.info(attributes.keys.toString())
            logger.info(attributes.values.toString())
            return OAuthAttributesBuilder()
                .id(response["id"] as String)
                .name(response["name"] as String)
                .loginType(registrationType)
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build()
        }

        private fun ofGoogle(
            userNameAttributeName: String,
            attributes: Map<String, Any>,
            registrationType: String

        ): OAuthAttributes {
            val logger = LoggerFactory.getLogger(this::class.java)!!
            logger.info(attributes.keys.toString())
            logger.info(attributes.values.toString())
            return OAuthAttributesBuilder()
                .id(attributes["id"] as String)
                .name(attributes["name"] as String)
                .loginType(registrationType)
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build()
        }
    }

    fun toEntity(): UserInfo {
        return UserInfoBuilder()
            .id(id)
            .name(name)
            .loginType(loginType)
            .build()
    }
}

class OAuthAttributesBuilder {
    private var attributes: Map<String, Any> = emptyMap()
    private var nameAttributeKey: String = ""
    private var id: String = ""
    private var name: String = ""
    private var loginType: String = ""

    fun attributes(attributes: Map<String, Any>) = apply { this.attributes = attributes }
    fun nameAttributeKey(nameAttributeKey: String) =
        apply { this.nameAttributeKey = nameAttributeKey }

    fun id(id: String) = apply { this.id = id }
    fun name(name: String) = apply { this.name = name }
    fun loginType(loginType: String) = apply { this.loginType = loginType }
    fun build(): OAuthAttributes {
        return OAuthAttributes(attributes, nameAttributeKey, loginType, id, name)
    }
}

class UserInfoBuilder {
    private var id: String = ""
    private var name: String = ""
    private var loginType: String = ""
//    private var role: Role = Role.GUEST

    fun id(id: String) = apply { this.id = id }
    fun name(name: String) = apply { this.name = name }
    fun loginType(loginType: String) = apply { this.loginType = loginType }
//    fun role(role: Role) = apply { this.role = role }

    fun build(): UserInfo {
        return UserInfo(
            userId = id,
            loginType = loginType,
            nickname = name,
            profile = "",
            preferOtt = null,
            preferGenre = null,
            favoriteContent = null,
            favoritePerson = null
        )
    }
}