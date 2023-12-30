package com.sideReview.side.common.constant

enum class CountryEnum(val ko : String) {
    KR("한국"),
    JP("일본"),
    CN("중국"),
    TW("대만"),
    HK("홍콩"),
    US("미국"),
    GB("영국"),
    FR("프랑스"),
    ES("스페인");

    companion object {
        fun getCountryCodes(): List<String> {
            return values().map { it.name }
        }

        fun getNameByCode(code: String): String {
            return values().find { it.name == code }?.ko ?: code
        }
    }
}