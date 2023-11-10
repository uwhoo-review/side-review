package com.sideReview.side.openSearch

import com.jillesvangurp.ktsearch.KtorRestClient
import com.jillesvangurp.ktsearch.Node
import com.jillesvangurp.ktsearch.SearchClient
import kotlinx.coroutines.runBlocking
import org.slf4j.LoggerFactory

class OpenSearchService {
    private val logger = LoggerFactory.getLogger(this.javaClass)!!
    private val client: SearchClient

    init {
        client = SearchClient(
            KtorRestClient(
                https = false,
                user = "uwho",
                password = "Uwho1234!",
                nodes = arrayOf(Node("15.164.189.220", 9200))
            )
        )

        runBlocking {
            val engineInfo = client.engineInfo()
            logger.info("**** Open Search Client connection ****")
            logger.info(engineInfo.name)
            logger.info(engineInfo.clusterName)
            logger.info(engineInfo.version.number)
            logger.info("****************************************")
        }
    }

    fun insert() {
    }
}