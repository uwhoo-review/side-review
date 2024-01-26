package com.sideReview.side.common.entity

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "user_report", catalog = "meta")
data class UserReport(
    @Id
    @Column(name = "writer_id", length = 100, nullable = false)
    var writerId: String,

    @Column(name = "rating_count", precision = 22, scale = 0)
    var ratingCount: java.math.BigDecimal? = null,

    @Column(name = "max_rating", precision = 18, scale = 1)
    var maxRating: Float? = null,

    @Column(name = "avg_rating", precision = 7, scale = 5)
    var avgRating: Double? = null,

    @Column(name = "review_count")
    var reviewCount: Long = 0
)
