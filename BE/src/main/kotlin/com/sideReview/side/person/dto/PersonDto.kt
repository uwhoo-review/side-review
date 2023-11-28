package com.sideReview.side.person.dto

import com.sideReview.side.openSearch.dto.ContentDto
import kotlinx.serialization.Serializable

@Serializable
data class PersonDto(
    val id: String,
    val name: String,
    val profile: String,
    val cast: List<PersonRoleDto>,
    val crew: List<PersonJobDto>
)

@Serializable
data class PersonRoleDto(
    val role: String,
    val content: ContentDto
)

@Serializable
data class PersonJobDto(
    val job: String,
    val content: ContentDto
)