package com.sideReview.side.login

enum class Role(val key: String, val title: String) {
    GUEST("GUEST", "비로그인 사용자"),
    USER("USER", "로그인 사용자")
}