package com.sideReview.side.openSearch

import com.jillesvangurp.ktsearch.*
import com.sideReview.side.tmdb.TmdbService
import com.sideReview.side.tmdb.document.ContentDocument
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.runBlocking
import org.springframework.stereotype.Service

@Service
class OpenSearchService(val tmdbService: TmdbService) {
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
            println("**** Open Search Client connection ****")
            println(engineInfo.name)
            println(engineInfo.clusterName)
            println(engineInfo.version.number)
            println("****************************************")
        }
    }

    /*
    * 첫 시작 시 Index 생성.
    * Application Runner 에서 사용
    * */
    public suspend fun initIndex() {

        kotlin.runCatching {
            client.createIndex("Content") {
                mappings(dynamicEnabled = false) {
                    keyword(ContentDocument::id)
                    text(ContentDocument::name)
                    keyword(ContentDocument::photo)
                    number<Int>(ContentDocument::genre)
                    number<Int>(ContentDocument::platform)
                    keyword(ContentDocument::rating)
                    number<Int>(ContentDocument::genre)
                    text(ContentDocument::synopsis)
                    keyword(ContentDocument::trailer)
                    keyword(ContentDocument::poster)
                    date(ContentDocument::firstAirDate)
                    number<Float>(ContentDocument::avgStarRating)
                }
            }
        }.onFailure {
            println("Schema already exist.")
        }.onSuccess { s ->
            println(s)
            println("Schema creation complete.")
        }
    }

    /*
    * 스케줄러에서 실행, 주기적으로 OpenSearch에 데이터를 넣어줌.
    * */
    suspend fun insert() {
        val docs = tmdbService.getMoreInfo(tmdbService.getAllContents())
        coroutineScope {
            client.bulk {
                docs.forEach { doc ->
                    index(
                        source = DEFAULT_JSON.encodeToString(
                            ContentDocument.serializer(),
                            doc
                        ),
                        index = "content"
                    )
                }
            }
        }
    }

    suspend fun get() {
        println(client.getIndex("content"))
    }
}