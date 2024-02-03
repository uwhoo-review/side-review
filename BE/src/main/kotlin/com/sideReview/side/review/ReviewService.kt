package com.sideReview.side.review

import com.sideReview.side.common.dto.PageInfoDto
import com.sideReview.side.common.util.MapperUtils.mapUserReviewToReviewDetailDTO
import com.sideReview.side.openSearch.dto.ContentDto
import com.sideReview.side.review.dto.PageReviewDto
import com.sideReview.side.review.dto.ReviewCreateDto
import com.sideReview.side.review.dto.ReviewDto
import com.sideReview.side.review.dto.ReviewEvaDto
import com.sideReview.side.review.entity.UserReview
import com.sideReview.side.review.exception.ReviewUpdateException
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate
import java.util.*

@Service
class ReviewService(
    val userReviewRepository: UserReviewRepository,
    val userInfoRepository: UserReviewRepository
) {

    @Transactional
    fun createOrUpdate(review: ReviewCreateDto, userId: String) {
        val uuid = "${UUID.randomUUID()}"
        // review id와 userId가 있다면 수정
        if (review.reviewId != null) {
            val rev = userReviewRepository.findById(review.reviewId).get()
            if (userInfoRepository.existsById(userId) && rev.writerId == userId) {
                rev.content = review.content
                rev.spoiler = if (review.spoiler) "1" else "0"
            } else {
                throw ReviewUpdateException("Cannot Update Review. User Id does not match with Writer Id.")
            }
        } else {
            userReviewRepository.save(
                UserReview(
                    reviewId = uuid,
                    targetId = review.dramaId,
                    writerId = userId,
                    like = 0,
                    dislike = 0,
                    spoiler = if (review.spoiler) "1" else "0",
                    create = LocalDate.now(),
                    content = review.content
                )
            )
        }
    }

    @Transactional
    fun evaluate(body: ReviewEvaDto) {
        userReviewRepository.findById(body.reviewId).ifPresent {
            if (body.eval == 0) it.dislike += 1
            else it.like += 1
        }
    }

    fun getReviewsByTargetId(
        id: String,
        sort: String,
        spoiler: String,
        pageable: PageRequest
    ): PageReviewDto {
        val userReviewList = mutableListOf<UserReview>()
        val totalReviewPage =
            userReviewRepository.findAllByTargetIdOrderByLikeDescDislikeAsc(id, pageable)
        val total = totalReviewPage.totalElements.toInt()
        var totalPages = totalReviewPage.totalPages
        var totalElements = totalReviewPage.totalElements.toInt()

        if (spoiler == "0") {
            var unSpoUserReviewPage: Page<UserReview>
            if (sort == "best") {
                unSpoUserReviewPage =
                    userReviewRepository.findAllByTargetIdAndSpoilerIsOrderByLikeDescDislikeAsc(
                        id,
                        spoiler,
                        pageable
                    )
            } else {//latest
                unSpoUserReviewPage =
                    userReviewRepository.findAllByTargetIdAndSpoilerIsOrderByCreateDesc(
                        id,
                        spoiler,
                        pageable
                    )
            }
            userReviewList.addAll(unSpoUserReviewPage.content)
            totalPages = unSpoUserReviewPage.totalPages
            totalElements = unSpoUserReviewPage.totalElements.toInt()
        } else {
            var userReviewPage: Page<UserReview>
            if (sort == "best") {
                userReviewPage = totalReviewPage
            } else {//latest
                userReviewPage =
                    userReviewRepository.findAllByTargetIdOrderByCreateDesc(id, pageable)
            }
            userReviewList.addAll(userReviewPage.content)
        }

        return PageReviewDto(
            ReviewDto(total, mapUserReviewToReviewDetailDTO(userReviewList)),
            PageInfoDto(totalElements, totalPages, pageable.pageNumber)
        )
    }

    fun fillReview(targets: List<ContentDto>): List<ContentDto> {
        val ids = targets.map { it.id }
        val reviews =
            userReviewRepository.findAllByTargetIdInAndSpoilerIsOrderByLikeDescDislikeAsc(ids, "1")

        val reviewMap = mutableMapOf<String, MutableList<UserReview>>()
        for (id in ids) reviewMap[id] = mutableListOf()
        reviews.map { reviewMap[it.targetId]?.add(it) }
        targets.map {
            it.review = reviewMap[it.id]?.let { it1 ->
                if (it1.size > 3)
                    ReviewDto(
                        3,
                        mapUserReviewToReviewDetailDTO(it1).subList(0, 3)
                    )
                else ReviewDto(
                    it1.size,
                    mapUserReviewToReviewDetailDTO(it1)
                )
            }
        }
        return targets
    }
}