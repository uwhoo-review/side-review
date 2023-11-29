package com.sideReview.side.openSearch

import com.jillesvangurp.ktsearch.*
import com.sideReview.side.common.document.*
import com.sideReview.side.tmdb.TmdbContentService
import com.sideReview.side.tmdb.TmdbPersonService
import kotlinx.coroutines.coroutineScope
import org.springframework.stereotype.Service
import kotlin.math.min

@Service
class OpenSearchSaveService(
    val tmdbContentService: TmdbContentService,
    val tmdbPersonService: TmdbPersonService,
    val client: SearchClient
) {

    /*
    * 첫 시작 시 Index 생성.
    * Application Runner 에서 사용
    * */
    public suspend fun initIndex() {

        // create content
        kotlin.runCatching {
            client.createIndex("content") {
                settings {
                    analysis {
                        analyzer("nori") {
                            tokenizer = "seunjeon_tokenizer"
                        }
                    }
                }
                mappings(dynamicEnabled = false) {
                    keyword(ContentDocument::id)
                    keyword(ContentDocument::sortingName)
                    text(ContentDocument::name) {
                        analyzer = "nori"
                    }
                    keyword(ContentDocument::photo)
                    number<Int>(ContentDocument::genre)
                    number<Int>(ContentDocument::platform)
                    keyword(ContentDocument::rating)
                    text(ContentDocument::synopsis) {
                        analyzer = "nori"
                    }
                    keyword(ContentDocument::trailer)
                    keyword(ContentDocument::poster)
                    date(ContentDocument::firstAirDate)
                    number<Float>(ContentDocument::avgStarRating)
                    number<Double>(ContentDocument::popularity)
                    number<Int>(ContentDocument::episodeCount)
                    text(ContentDocument::season)
                    objField(ContentDocument::production) {
                        text(Product::company)
                        text(Product::country)
                    }
                }
            }
        }.onFailure {
            println(it.message)
            println("Content Schema already exist.")
        }.onSuccess { s ->
            println(s)
            println("Content Schema creation complete.")
        }


        // create Person
        kotlin.runCatching {
            client.createIndex("person") {
                settings {
                    analysis {
                        analyzer("nori") {
                            tokenizer = "seunjeon_tokenizer"
                        }
                    }
                }
                mappings(dynamicEnabled = false) {
                    keyword(PersonDocument::id)
                    keyword(PersonDocument::sortingName)
                    text(PersonDocument::name) {
                        analyzer = "nori"
                    }
                    keyword(PersonDocument::profilePath)
                    number<Float>(PersonDocument::popularity)
                    objField(PersonDocument::cast) {
                        keyword(RoleInfo::role)
                        keyword(RoleInfo::contentId)
                    }
                    objField(PersonDocument::crew) {
                        keyword(JobInfo::job)
                        keyword(JobInfo::contentId)
                    }
                }
            }
        }.onFailure {
            println(it.message)
            println("Person Schema already exist.")
        }.onSuccess { s ->
            println(s)
            println("Person Schema creation complete.")
        }
    }

    /*
    * 스케줄러에서 실행, 주기적으로 OpenSearch에 데이터를 넣어줌.
    * */
    suspend fun insert(idxName: String) {
        // callback 선언
        val itemCallBack = object : BulkItemCallBack {
            override fun itemFailed(
                operationType: OperationType,
                item: BulkResponse.ItemDetails
            ) {
                println(
                    """
      ${operationType.name} failed
      ${item.id} with ${item.status}
      """.trimMargin()
                )
                println(item.error)
                println(item.toString())
                println("---------------")

            }

            override fun itemOk(
                operationType: OperationType,
                item: BulkResponse.ItemDetails
            ) {
//                println(
//                    """ \n
//      operation $operationType completed!
//      id: ${item.id}
//      sq_no: ${item.seqNo}
//      primary_term ${item.primaryTerm}
//      \n
//    """.trimIndent()
//                )
            }

            override fun bulkRequestFailed(
                e: Exception,
                ops: List<Pair<String, String?>>
            ) {
                println(
                    """
                        \n
      Request failure ${e.message}.
      Unless you set 
    """.trimIndent()
                )
            }
        }

        if (idxName == "content") {
            val docs: List<ContentDocument> =
                tmdbContentService.getMoreInfo(tmdbContentService.getAllContents())
            coroutineScope {
                val roop = docs.size / 300
                for (i: Int in 0..roop) {
                    val roopDocs = docs.subList(i * 300, min((i + 1) * 300, docs.size))
                    client.bulk(
                        bulkSize = roopDocs.size,
                        target = idxName,
                        callBack = itemCallBack
                    ) {
                        roopDocs.forEach { doc ->
                            index(
                                source = DEFAULT_JSON.encodeToString(
                                    ContentDocument.serializer(),
                                    doc
                                ),
                                id = doc.id.toString()

                            )
                        }
                    }
                }
            }
        } else if (idxName == "person") {
            val docs: List<PersonDocument> =
                tmdbPersonService.getCreditInfo(tmdbPersonService.getAllPeople())
            coroutineScope {
                val roop = docs.size / 300
                for (i: Int in 0..roop) {
                    val roopDocs = docs.subList(i * 300, min((i + 1) * 300, docs.size))
                    client.bulk(
                        bulkSize = roopDocs.size,
                        target = idxName,
                        callBack = itemCallBack
                    ) {
                        roopDocs.forEach { doc ->
                            index(
                                source = DEFAULT_JSON.encodeToString(
                                    PersonDocument.serializer(),
                                    doc
                                ),
                                id = doc.id.toString()
                            )
                        }
                    }
                }
            }
        }
    }

    // test용 임시 함수
    suspend fun get(idxName: String) {
        println(client.getIndex(idxName))
    }

    // test용 임시 함수
    suspend fun delete(idxName: String) {
        client.deleteIndex(idxName)
    }
}