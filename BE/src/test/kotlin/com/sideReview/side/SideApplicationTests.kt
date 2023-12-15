package com.sideReview.side

import org.junit.jupiter.api.Test

class SideApplicationTests {

    @Test
    fun contextLoads() {
        val regex = """[^\d.](?:.*)""".toRegex()
        val testS = "192.1.1.548, 654.1.81.ww3, !$@9s8,6813.23CS"
        println(regex.find(testS))
        println(testS.matches(regex))
        println(testS.replace(regex, ""))
    }

}
