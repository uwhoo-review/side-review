package com.sideReview.side.openSearch

import com.jillesvangurp.ktsearch.*
import com.jillesvangurp.searchdsls.querydsl.bool
import com.jillesvangurp.searchdsls.querydsl.matchPhrase
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Test
import org.slf4j.LoggerFactory
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles

@SpringBootTest
@ActiveProfiles("local")
class LibraryTest {
    private val logger = LoggerFactory.getLogger(this.javaClass)!!

    @Test
    fun clientCreate() {
        val client = SearchClient(
            KtorRestClient(
                https = false,
                user = "uwho",
                password = "Uwho1234!",
                nodes = arrayOf(Node("15.164.189.220", 9200))
            )
        )

        runBlocking {
            val engineInfo = client.engineInfo()
            logger.error("**** LibraryTest :: Print log start ****")
            logger.info(engineInfo.name)
            logger.info(engineInfo.clusterName)
            logger.info(engineInfo.clusterUUID)
            logger.info(engineInfo.version.number)
        }
    }

    @Test
    fun createIndex() {
        val client = SearchClient(
            KtorRestClient(
                https = false,
                user = "uwho",
                password = "Uwho1234!",
                nodes = arrayOf(Node("15.164.189.220", 9200))
            )
        )

        val json = """{"message" : "hello world"}"""

        runBlocking {
            client.indexDocument("index-create-test", json)

            logger.error("**** createIndex Test :: Print log start ****")
            logger.info(client.search("index-create-test").ids.toString())
        }
    }

    @Test
    fun getResponse() {
        val client = SearchClient(
            KtorRestClient(
                https = false,
                user = "uwho",
                password = "Uwho1234!",
                nodes = arrayOf(Node("15.164.189.220", 9200))
            )
        )
        runBlocking {
            println(client.search("content") {
                query = bool { must(matchPhrase("name", "하우스")) }

            })
        }
    }
}