package com.sideReview.side.controller

import com.sideReview.side.common.dto.UserInfoDto
import com.sideReview.side.common.entity.UserFavoriteContent
import com.sideReview.side.common.entity.UserInfo
import com.sideReview.side.common.util.ClientUtils
import com.sideReview.side.login.LoginService
import com.sideReview.side.login.LoginUser
import com.sideReview.side.openSearch.OpensearchClient
import com.sideReview.side.openSearch.dto.DetailContentDto
import com.sideReview.side.review.ContentReviewFacade
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@RestController
class DetailController @Autowired constructor(
    private val opensearchClient: OpensearchClient,
    private val contentReviewFacade: ContentReviewFacade,
    private val loginService: LoginService
) {
    @GetMapping("/contents/{id}")
    fun getContentDetail(
        @PathVariable id: String,
        request: HttpServletRequest,
        @LoginUser(required = false) user: UserInfoDto?
    ): ResponseEntity<Any> {
        val userId = ClientUtils.getUserId(request, user)
        val userEntity: UserInfo? =
            if (ClientUtils.getUserType(userId) == "1")
                loginService.getUser(userId)
            else null
        val userFavorite = userEntity?.favoriteContent
        val detailContentDto = contentReviewFacade.fillReviewInDetail(
            opensearchClient.getOneContent(
                id,
                ClientUtils.getUserId(request, user)
            ), user?.id
        )

        return ResponseEntity.ok(
            fillFavorite(userFavorite, detailContentDto)
        )
    }

    @GetMapping("/person/{id}")
    fun get(@PathVariable id: String): ResponseEntity<Any> {
        return ResponseEntity.ok(opensearchClient.getOnePerson(id))
    }

    private fun fillFavorite(
        userFavorite: List<UserFavoriteContent>?,
        content: DetailContentDto
    ): DetailContentDto {
        return if (userFavorite != null && userFavorite.map { it.contentId }.contains(content.id)) {
            content.favorite = true
            content
        } else content
    }
}