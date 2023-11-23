package com.sideReview.side.person.dto

import com.sideReview.side.openSearch.dto.ContentDto

data class PersonDto(
    val id: String,
    val name: String,
    val profile: String,
    val cast: List<PersonRoleDto>,
    val crew: List<PersonJobDto>
)

data class PersonRoleDto(
    val role: String,
    val content: ContentDto
)

data class PersonJobDto(
    val job: String,
    val content: ContentDto
)