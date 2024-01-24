package com.sideReview.side.names.entity

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "NAMES", catalog = "meta")
data class Names(
    @Id
    @Column(name = "id", nullable = false)
    val id: Int,

    @Column(name = "korean_name", length = 255, nullable = true)
    val koreanName: String,

    @Column(name = "english_Name", length = 255, nullable = false)
    val englishName: String
)
