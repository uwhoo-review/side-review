package com.sideReview.side.review.entity

import org.hibernate.annotations.Comment
import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "user_review_eval", catalog = "meta")
data class UserReviewEval(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "user_review_eval_seq_gen", sequenceName = "user_review_eval_seq")
    @Column(name = "eval_id", nullable = false, length = 11)
    val evalId: Int,

    @Column(name = "review_id", nullable = false, length = 36)
    val reviewId: String,

    @Column(name = "writer_id", nullable = false, length = 100)
    val writerId: String,

    @Column(name = "eval", nullable = false, length = 1)
    @Comment("0: dislike, 1: like")
    val eval: Int,

    @CreationTimestamp
    @Column(name = "creation_time", nullable = false)
    val creationTime: LocalDateTime = LocalDateTime.now()


)