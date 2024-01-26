package com.sideReview.side.controller

import com.sideReview.side.openSearch.OpensearchClient
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class DetailController @Autowired constructor(
    private val opensearchClient: OpensearchClient
) {
    @GetMapping("/contents/{id}")
    fun getContentDetail(
        @PathVariable id: String,
        @RequestHeader(name = "userId", required = false) userId: String
    ): ResponseEntity<Any> {
        return ResponseEntity.ok(opensearchClient.getOneContent(id, userId))
    }

    @GetMapping("/person/{id}")
    fun get(@PathVariable id: String): ResponseEntity<Any> {
        return ResponseEntity.ok(opensearchClient.getOnePerson(id))
    }
}