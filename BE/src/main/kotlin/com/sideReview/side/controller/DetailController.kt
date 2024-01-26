package com.sideReview.side.controller

import com.sideReview.side.common.util.ClientUtils
import com.sideReview.side.openSearch.OpensearchClient
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@RestController
class DetailController @Autowired constructor(
    private val opensearchClient: OpensearchClient
) {
    @GetMapping("/contents/{id}")
    fun getContentDetail(
        @PathVariable id: String,
        request: HttpServletRequest
    ): ResponseEntity<Any> {
        val logger = LoggerFactory.getLogger(this::class.java)!!
        for (headerName in request.headerNames) {
            logger.info("$headerName : ${request.getHeader(headerName)}")
        }
        return ResponseEntity.ok(opensearchClient.getOneContent(id, ClientUtils.getIp(request)))
    }

    @GetMapping("/person/{id}")
    fun get(@PathVariable id: String): ResponseEntity<Any> {
        return ResponseEntity.ok(opensearchClient.getOnePerson(id))
    }
}