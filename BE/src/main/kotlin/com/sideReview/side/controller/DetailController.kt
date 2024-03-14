package com.sideReview.side.controller

import com.sideReview.side.common.dto.UserInfoDto
import com.sideReview.side.common.util.ClientUtils
import com.sideReview.side.login.LoginUser
import com.sideReview.side.openSearch.OpensearchClient
import com.sideReview.side.review.ContentReviewFacade
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@RestController
class DetailController @Autowired constructor(
    private val opensearchClient: OpensearchClient,
    private val contentReviewFacade: ContentReviewFacade
) {
    @GetMapping("/contents/{id}")
    fun getContentDetail(
        @PathVariable id: String,
        request: HttpServletRequest,
        @LoginUser(required = false) user: UserInfoDto?
    ): ResponseEntity<Any> {
        return ResponseEntity.ok(
            contentReviewFacade.fillReviewInDetail(
                opensearchClient.getOneContent(
                    id,
                    ClientUtils.getUserId(request, user)
                ), user?.id
            )
        )
    }

    @GetMapping("/person/{id}")
    fun get(@PathVariable id: String): ResponseEntity<Any> {
        return ResponseEntity.ok(opensearchClient.getOnePerson(id))
    }
}