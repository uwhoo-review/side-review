package com.sideReview.side.review.entity

import org.hibernate.annotations.ColumnDefault
import org.springframework.data.annotation.CreatedDate
import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "USER_REVIEW")
class UserReview(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REVIEW_ID", length = 36, nullable = false)
    var reviewId: String,

    @Column(name = "TARGET_ID", length = 36, nullable = false)
    var targetId: String,

    @Column(name = "WRITER_ID", length = 15, nullable = false)
    var writerId: String,

    @Column(name = "LIKE_CNT", nullable = false)
    @ColumnDefault("0")
    var like: Int,

    @Column(name = "DISLIKE_CNT", nullable = false)
    @ColumnDefault("0")
    var dislike: Int,

    @Column(name = "SPOILER", length = 1, nullable = false)
    @ColumnDefault("0")
    var spoiler: String,

    @Column(columnDefinition = "DATE", name = "CREATION_TIME", nullable = false)
    @CreatedDate
    var create: LocalDate,

    @Column(name = "CONTENT", length = 2000, nullable = false)
    var content: String,
)