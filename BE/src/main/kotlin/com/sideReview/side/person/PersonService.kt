package com.sideReview.side.person

import com.jillesvangurp.ktsearch.SearchClient
import com.jillesvangurp.ktsearch.SearchResponse
import com.jillesvangurp.ktsearch.search
import com.jillesvangurp.searchdsls.querydsl.match
import com.jillesvangurp.searchdsls.querydsl.matchPhrase
import com.sideReview.side.common.document.PersonDocument
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class PersonService @Autowired constructor(val client: SearchClient) {
    suspend fun get(id: String): SearchResponse {
        return client.search("person") {
            query = match(PersonDocument::id, id)
        }
    }

    suspend fun searchMatch(name: String): SearchResponse {
        return client.search("person") {
            query = match(PersonDocument::name, name)
        }
    }

    suspend fun searchMatchPhrase(name: String): SearchResponse {
        return client.search("person") {
            query = matchPhrase(PersonDocument::name, name)
        }
    }

}