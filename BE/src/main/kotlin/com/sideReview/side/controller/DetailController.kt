package com.sideReview.side.controller

import com.sideReview.side.openSearch.OpenSearchDetailService
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class DetailController @Autowired constructor(private val openSearchDetailService: OpenSearchDetailService){
    @GetMapping("/contents/{id}")
    fun getContentDetail(@PathVariable id : String) : ResponseEntity<Any> {
        var response: ResponseEntity<Any>
        runBlocking{
            response = ResponseEntity.ok(openSearchDetailService.getContentDocument(id))
        }
        return response
    }

    @GetMapping("/person/{id}")
    fun get(@PathVariable id: String): ResponseEntity<Any> {
        var response: ResponseEntity<Any> = ResponseEntity(HttpStatus.BAD_REQUEST)

        runBlocking {
            response = ResponseEntity.ok(openSearchDetailService.getPersonDocument(id))
        }
        return response
    }
}