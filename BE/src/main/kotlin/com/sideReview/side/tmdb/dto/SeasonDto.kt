package com.sideReview.side.tmdb.dto

import com.sideReview.side.common.document.Season
import kotlinx.serialization.Serializable

@Serializable
data class SeasonDto(
    val id: String,
    val name: String
) {
    constructor(s: Season) : this(s.id, s.name)
}
