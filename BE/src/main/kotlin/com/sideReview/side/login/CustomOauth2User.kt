package com.sideReview.side.login

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.oauth2.core.user.OAuth2User

class CustomOAuth2User(private val delegate: OAuth2User) : OAuth2User {
    private val attributes: MutableMap<String, Any>

    init {
        // 기존 속성을 포함한 Map 생성
        attributes = HashMap(delegate.attributes)
    }

    override fun getAttributes(): Map<String, Any> {
        return attributes
    }

    override fun getAuthorities(): Collection<GrantedAuthority?> {
        return delegate.authorities
    }

    override fun getName(): String {
        return delegate.name
    }

    fun setAttributes(key: String, value: Any) {
        attributes[key] = value
    }
}