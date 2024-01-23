package com.sideReview.side.review

import com.sideReview.side.common.dto.PageInfoDto
import com.sideReview.side.common.util.MapperUtils.mapUserReviewToReviewDetailDTO
import com.sideReview.side.openSearch.dto.ContentDto
import com.sideReview.side.review.dto.*
import com.sideReview.side.review.entity.UserReview
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate
import java.util.*

@Service
class ReviewService(val userReviewRepository: UserReviewRepository) {
    private val logger = LoggerFactory.getLogger(this.javaClass)!!
    /*
    fun get(id: String, sort: String?, spoiler: Boolean): ReviewDTO {
        val reviews: List<UserReview>
        if (spoiler) {
            reviews = if (!sort.isNullOrBlank()) {
                if (sort == "best")
                    userReviewRepository.findByTargetIdOrderByLikeDescDislikeAsc(
                        id
                    )
                else userReviewRepository.findByTargetIdOrderByCreate(id)
            } else userReviewRepository.findByTargetId(id)
        } else {
            reviews = if (!sort.isNullOrBlank()) {
                if (sort == "best")
                    userReviewRepository.findByTargetIdAndSpoilerIsOrderByLikeDescDislikeAsc(
                        id, "0"
                    )
                else userReviewRepository.findByTargetIdAndSpoilerIsOrderByCreate(id, "0")
            } else
                userReviewRepository.findByTargetIdAndSpoilerIs(id, "0")
        }

        return ReviewDTO(reviews.size, mapUserReviewToReviewDetailDTO(reviews))
    }
     */

    @Transactional
    fun create(review: ReviewCreateDto, ip: String) {
        val uuid = "${UUID.randomUUID()}"
        kotlin.runCatching {
            userReviewRepository.save(
                UserReview(
                    reviewId = uuid,
                    targetId = review.dramaId,
                    writerId = ip,
                    like = 0,
                    dislike = 0,
                    spoiler = if (review.spoiler) "1" else "0",
                    create = LocalDate.now(),
                    content = review.content
                )
            )
        }.onFailure {
            logger.error("############################################")
            logger.error("########### Error on Review Save ###########")
            logger.error("############################################")
            logger.error(it.message)
            logger.error("${it.stackTrace}")
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
            ReviewDto(total,mapUserReviewToReviewDetailDTO(userReviewList)),
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