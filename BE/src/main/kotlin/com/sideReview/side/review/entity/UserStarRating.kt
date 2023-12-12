package com.sideReview.side.review.entity

import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "USER_STAR_RATING", catalog = "meta")
data class UserStarRating(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 0,

    @Column(name = "target_id", length = 36, nullable = false)
    val targetId: String,

    @Column(name = "writer_id", length = 15, nullable = false)
    val writerId: String,

    @Column(name = "rating", nullable = false)
    val rating: Float,

    @CreationTimestamp
    @Column(name = "creation_time", nullable = false)
    val creationTime: LocalDateTime = LocalDateTime.now()
)
