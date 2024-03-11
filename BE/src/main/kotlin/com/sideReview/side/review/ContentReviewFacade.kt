package com.sideReview.side.review

import com.sideReview.side.openSearch.OpensearchClient
import com.sideReview.side.openSearch.dto.ContentDto
import com.sideReview.side.openSearch.dto.DetailContentDto
import com.sideReview.side.review.dto.PageReviewDto
import com.sideReview.side.review.dto.ReviewDetailDto
import com.sideReview.side.review.dto.ReviewTargetDto
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class ContentReviewFacade(
    private val reviewService: ReviewService,
    private val opensearchClient: OpensearchClient
) {
    /*
    * Content에 review를 채우는 서비스
    * */

    fun fillContentInReview(
        reviewList: List<ReviewDetailDto>,
        contentId: String?
    ): List<ReviewDetailDto> {
        val contentIdList: MutableList<String> = mutableListOf()
        if (contentId == null)
            contentIdList.addAll(reviewList.map { it.target.contentId })
        else contentIdList.add(contentId)

        val docMap = opensearchClient.getAllContents(contentIdList).associateBy { it.id }
        val reviewIdToContentIdMap =
            if (contentId == null) reviewList.associateBy { it.id }
                .mapValues { it.value.target.contentId }
            else reviewList.associateBy { it.id }.mapValues { contentId }

        reviewList.forEach {
            val target = docMap[reviewIdToContentIdMap[it.id]]
            if (target != null) {
                it.target = ReviewTargetDto(
                    contentId = target.id,
                    name = target.name,
                    season = target.getSeason(),
                    date = target.getYear()
                )
            } else println("로직 변경 필요")
        }

        return reviewList
    }

    fun fillReviewInDetail(detail: DetailContentDto, userId: String?): DetailContentDto {
        if (!userId.isNullOrBlank()){
            val review = reviewService.getOneReviewByWriterId(detail.id, userId)
            detail.review = fillMoreReviewInfo(listOfNotNull(review), detail.id).first()
        }
        return detail
    }

    fun getReviewsByTargetId(
        id: String,
        sort: String,
        spoiler: String,
        type: String,
        pageable: PageRequest
    ): PageReviewDto {
        val pageReviewDto = reviewService.getReviewsByTargetId(id, sort, spoiler, type, pageable)
        pageReviewDto.reviews.review = fillMoreReviewInfo(pageReviewDto.reviews.review, id)
        return pageReviewDto
    }

    fun fillReview(targets: List<ContentDto>): List<ContentDto> {
        val pageable = PageRequest.of(0, 3)
        for (content in targets) {
            content.review =
                getReviewsByTargetId(
                    content.id,
                    "best",
                    "1",
                    "0",
                    pageable
                ).reviews
        }
        return targets
    }

    private fun fillBestInReview(
        reviewsByTargetId: List<ReviewDetailDto>,
        contentId: String
    ): List<ReviewDetailDto> {
        val bestReviewIdList = reviewService.getBestReviewByTargetId(contentId)

        return bestReviewIdList?.let { bestIds ->
            reviewsByTargetId.take(6).onEach { review ->
                if (bestIds.contains(review.id)) {
                    review.best = true
                }
            }
        } ?: reviewsByTargetId
    }


    private fun checkAndFillBestReview(
        reviewsByTargetId: List<ReviewDetailDto>
    ): List<ReviewDetailDto> {
        /*
        * mypage user가 쓴 리뷰 전체 조회
        * 리뷰마다 contentId가 다르기 때문에 계속 새로 조회
        * */
        reviewsByTargetId.forEach {
            val targetId = it.target.contentId
            if (reviewService.getBestReviewByTargetId(targetId)?.contains(it.id) == true) {
                it.best = true
            }
        }
        return reviewsByTargetId
    }

    private fun fillMoreReviewInfo(
        reviewList: List<ReviewDetailDto>,
        contentId: String?
    ): List<ReviewDetailDto> {
        // fill content info
        val contentFilledReviewList =
            fillContentInReview(reviewList, contentId)

        return if (contentId == null) checkAndFillBestReview(
            contentFilledReviewList
        )
        else fillBestInReview(contentFilledReviewList, contentId)
    }

    fun getReviewsByWriterId(
        userId: String,
        pageable: PageRequest
    ): PageReviewDto {
        val pageReviewDto = reviewService.getReviewsByWriterId(userId, pageable)
        pageReviewDto.reviews.review = fillMoreReviewInfo(
            pageReviewDto.reviews.review,
            null
        )
        return pageReviewDto
    }

}