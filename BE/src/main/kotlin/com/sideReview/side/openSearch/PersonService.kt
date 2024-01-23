package com.sideReview.side.openSearch

import com.jillesvangurp.ktsearch.SearchClient
import com.jillesvangurp.ktsearch.SearchResponse
import com.jillesvangurp.ktsearch.count
import com.jillesvangurp.ktsearch.search
import com.jillesvangurp.searchdsls.querydsl.bool
import com.jillesvangurp.searchdsls.querydsl.match
import com.jillesvangurp.searchdsls.querydsl.matchPhrase
import com.jillesvangurp.searchdsls.querydsl.term
import com.sideReview.side.common.document.PersonDocument
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class PersonService @Autowired constructor(val client: SearchClient) {
    suspend fun getPerson(id: String): SearchResponse {
        return client.search("person") {
            query = match(PersonDocument::id, id)
        }
    }

    suspend fun searchMatch(name: String, page: Int, size: Int): SearchResponse {
        return client.search("person") {
            query = match(PersonDocument::name, name)
            resultSize = size
            from = page
        }
    }

    suspend fun searchMatchCount(name: String): Int {
        return client.count("person") {
            query = match(PersonDocument::name, name)
        }.count.toInt()
    }

    suspend fun searchMatchPhrase(name: String): SearchResponse {
        return client.search("person") {
            query = matchPhrase(PersonDocument::name, name)
        }
    }

    suspend fun filterMatch(name: String?): SearchResponse {
        return if (!name.isNullOrBlank()) {
            client.search("person") {
                query = bool {
                    filter(term(PersonDocument::name, name))
                }
            }
        } else {
            client.search("person")
        }
    }
}