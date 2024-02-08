package com.sideReview.side.login

@Target(AnnotationTarget.VALUE_PARAMETER)
@Retention(AnnotationRetention.RUNTIME)
annotation class LoginUser(
    val required: Boolean = false
)