package com.sideReview.side.review

import com.sideReview.side.common.dto.PageInfoDto
import com.sideReview.side.common.repository.UserInfoRepository
import com.sideReview.side.common.util.MapperUtils
import com.sideReview.side.common.util.MapperUtils.mapUserReviewToReviewDetailDTO
import com.sideReview.side.openSearch.OpensearchClient
import com.sideReview.side.openSearch.dto.ContentDto
import com.sideReview.side.review.dto.*
import com.sideReview.side.review.entity.UserReview
import com.sideReview.side.review.entity.UserReviewEval
import com.sideReview.side.review.exception.*
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate
import java.util.*

@Service
class ReviewService(
    private val userReviewRepository: UserReviewRepository,
    private val userInfoRepository: UserInfoRepository,
    private val userReviewEvalRepository: UserReviewEvalRepository,
    //private val opensearchClient: OpensearchClient
    ) {
    val logger = LoggerFactory.getLogger(this::class.java)!!

    @Transactional
    fun createOrUpdate(review: ReviewCreateDto, userId: String, userType: String) {
        val uuid = "${UUID.randomUUID()}"
        // 로그인 유저이고, review id와 userId가 있다면 수정
        if (userType == "1" && review.reviewId != null) {
            if (userInfoRepository.existsById(userId)) {
                val revOpt: Optional<UserReview> = userReviewRepository.findById(review.reviewId)
                if (revOpt.isPresent) {
                    val rev = revOpt.get()
                    if (rev.writerId == userId) {
                        rev.content = review.content
                        rev.spoiler = if (review.spoiler) "1" else "0"
                    } else {
                        throw ReviewUserIdInvalidException("Cannot Update Review. User Id does not match with Writer Id.")
                    }
                } else throw ReviewGetIdInvalidException()
            } else {
                throw ReviewUserIdInvalidException("Cannot Update Review. User Id not found.")
            }
        } else {
            // 신규 생성
            if (userReviewRepository.existsByTargetIdAndWriterId(
                    review.dramaId,
                    userId
                )
            ) throw ReviewSaveDuplicateException("Review already exists. Cannot write multiple reviews")
            userReviewRepository.save(
                UserReview(
                    reviewId = uuid,
                    targetId = review.dramaId,
                    writerId = userId,
                    userType = userType,
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
    fun evaluate(body: ReviewEvaDto, userId: String) {
        val review = userReviewRepository.findById(body.reviewId)

        review.ifPresent { existingReview ->
            val reviewEval = userReviewEvalRepository.findByReviewIdAndWriterId(body.reviewId, userId)

            if (reviewEval == null) {
                userReviewEvalRepository.save(
                    UserReviewEval(
                        reviewId = body.reviewId,
                        eval = body.eval,
                        writerId = userId
                    )
                )
                userReviewRepository.save(review.get())
            } else {
                handleExistingReviewEval(reviewEval, body.eval)
            }
            val like = userReviewEvalRepository.countByReviewIdAndEval(body.reviewId, 1)
            val dislike = userReviewEvalRepository.countByReviewIdAndEval(body.reviewId, 0)
            review.get().like = like
            review.get().dislike = dislike
            userReviewRepository.save(review.get())
        }
    }

    fun getReviewsByTargetId(
        id: String,
        sort: String,
        spoiler: String,
        type: String,
        pageable: PageRequest,
        userId: String,
        opensearchClient: OpensearchClient
    ): PageReviewDto {

        val spoilerInt = spoiler.toIntOrNull()
        val getUserReviewFunc: () -> Page<UserReview> = {
            when (spoilerInt) {
                0 -> {
                    when (sort) {
                        "best" -> {
                            when (type) {
                                "0" -> userReviewRepository.findAllByTargetIdAndSpoilerIsOrderByLikeDescDislikeAsc(
                                    id,
                                    spoiler,
                                    pageable
                                )

                                "1", "2" -> userReviewRepository.findAllByTargetIdAndUserTypeAndSpoilerIsOrderByLikeDescDislikeAsc(
                                    id,
                                    type,
                                    spoiler,
                                    pageable
                                )

                                else -> {
                                    throw ReviewGetAllTypeException()
                                }
                            }
                        }

                        "latest" -> {
                            when (type) {
                                "0" -> userReviewRepository.findAllByTargetIdAndSpoilerIsOrderByCreateDesc(
                                    id,
                                    spoiler,
                                    pageable
                                )

                                "1", "2" -> userReviewRepository.findAllByTargetIdAndUserTypeAndSpoilerIsOrderByCreateDesc(
                                    id,
                                    type,
                                    spoiler,
                                    pageable
                                )

                                else -> {
                                    throw ReviewGetAllTypeException()
                                }
                            }
                        }

                        else -> {
                            throw ReviewGetAllSortException()
                        }
                    }
                }

                1 -> {
                    when (sort) {
                        "best" -> {
                            when (type) {
                                "0" -> userReviewRepository.findAllByTargetIdOrderByLikeDescDislikeAsc(
                                    id,
                                    pageable
                                )

                                "1", "2" -> userReviewRepository.findAllByTargetIdAndUserTypeOrderByLikeDescDislikeAsc(
                                    id,
                                    type,
                                    pageable
                                )

                                else -> {
                                    throw ReviewGetAllTypeException()
                                }
                            }
                        }

                        "latest" -> {
                            when (type) {
                                "0" -> userReviewRepository.findAllByTargetIdOrderByCreateDesc(
                                    id,
                                    pageable
                                )

                                "1", "2" -> userReviewRepository.findAllByTargetIdAndUserTypeOrderByCreateDesc(
                                    id,
                                    type,
                                    pageable
                                )

                                else -> {
                                    throw ReviewGetAllTypeException()
                                }
                            }
                        }

                        else -> {
                            throw ReviewGetAllSortException()
                        }
                    }
                }

                else -> {
                    throw ReviewGetAllSpoilerException()
                }
            }
        }

        val total = userReviewRepository.countAllByTargetId(id)

        val userReview: Page<UserReview> = getUserReviewFunc()
        val totalPages = userReview.totalPages
        val totalElements = userReview.totalElements.toInt()
        val reviewDetailDtoList = mapUserReviewToReviewDetailDTO(userReview.content)

        return PageReviewDto(
            ReviewDto(total, fillMoreReviewInfo(fillUserInReview(reviewDetailDtoList), null, id, opensearchClient)),
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
                if (it1.size > 3) {
                    val reviewDetailSubList = mapUserReviewToReviewDetailDTO(it1).subList(0, 3)
                    ReviewDto(
                        3,
                        fillUserInReview(reviewDetailSubList)
                    )
                } else {
                    val reviewDetailList = mapUserReviewToReviewDetailDTO(it1)
                    ReviewDto(
                        it1.size,
                        fillUserInReview(reviewDetailList)
                    )
                }
            }
        }
        return targets
    }

    fun fillUserInReview(reviewsByTargetId: List<ReviewDetailDto>): List<ReviewDetailDto> {
        for (review in reviewsByTargetId) {
            if (review.user.type == "1") {
                val user = userInfoRepository.findById(review.user.id).get()
                review.user.nickname = user.nickname
                review.user.profile = user.profile
            }
        }
        return reviewsByTargetId
    }
    private fun fillMoreReviewInfo(
        reviewList: List<ReviewDetailDto>,
        entityList: List<UserReview>?,
        contentId: String?,
        opensearchClient: OpensearchClient
    ): List<ReviewDetailDto> {
        val contentFilledReviewList = opensearchClient.fillContentInReview(reviewList, entityList, contentId)
        return if (contentId == null) checkAndFillBestReview(
            contentFilledReviewList,
            entityList!!)
        else fillBestInReview(contentFilledReviewList, contentId)
    }
    private fun fillBestInReview(reviewsByTargetId: List<ReviewDetailDto>, contentId: String): List<ReviewDetailDto> {
        val bestReviewIdList = getBestReviewByTargetId(contentId)

        return bestReviewIdList?.let { bestIds ->
            reviewsByTargetId.take(6).onEach { review ->
                if (bestIds.contains(review.id)) {
                    review.best = true
                }
            }
        } ?: reviewsByTargetId
    }

    private fun checkAndFillBestReview(
        reviewsByTargetId: List<ReviewDetailDto>,
        entityList: List<UserReview>
    ): List<ReviewDetailDto> {
        val targetIdMap = entityList.associateBy { it.reviewId }.mapValues { it.value.targetId }
        reviewsByTargetId.forEach {
            val targetId = targetIdMap[it.id]
            if (getBestReviewByTargetId(targetId!!)?.contains(it.id) == true) {
                it.best = true
            }
        }
        return reviewsByTargetId
    }

    fun getReviewsByWriterId(userId: String, pageable: PageRequest, opensearchClient: OpensearchClient): PageReviewDto {
        val total = userReviewRepository.countAllByWriterId(userId)
        val userReview = userReviewRepository.findAllByWriterId(userId, pageable)
        val reviewDetailDtoList = mapUserReviewToReviewDetailDTO(userReview.content)
        val totalPages = userReview.totalPages
        val totalElements = userReview.totalElements.toInt()

        return PageReviewDto(
            ReviewDto(total, fillMoreReviewInfo(fillUserInReview(reviewDetailDtoList), userReview.content, null, opensearchClient)),
            PageInfoDto(totalElements, totalPages, pageable.pageNumber)
        )
    }

    fun delete(reviewId: String, id: String) {
        if (!userInfoRepository.existsById(id)) throw ReviewUserIdInvalidException("Cannot delete review. User Not Found.")
        userReviewRepository.deleteById(reviewId)
    }

    private fun getBestReviewByTargetId(contentId: String): List<String>? {
        val entities = userReviewRepository.findAllByTargetIdOrderByLikeDescDislikeAsc(
            contentId,
            pageable = PageRequest.of(0, 6)
        ).content
        return if (entities.size > 0) entities.map { it.reviewId } else null
    }

    private fun handleExistingReviewEval(reviewEval: UserReviewEval, newEval: Int) {
        if (reviewEval.eval == newEval) {
            userReviewEvalRepository.delete(reviewEval)
        } else {
            reviewEval.eval = newEval
            userReviewEvalRepository.save(reviewEval)
        }
    }
    fun getOneReviewByWriterId(contentId: String, userId: String): ReviewDetailDto {
        val entity = userReviewRepository.findByTargetIdAndWriterId(contentId, userId)
        var dto: MutableList<ReviewDetailDto> = mutableListOf()
        if (entity != null) {
            val dtoList = fillUserInReview(MapperUtils.mapUserReviewToReviewDetailDTO(listOf(entity)))
            dto.addAll(dtoList)
        }
        return if (dto.size > 0) dto[0] else ReviewDetailDto()
    }
}