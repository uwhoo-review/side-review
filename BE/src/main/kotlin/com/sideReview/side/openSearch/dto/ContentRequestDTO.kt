package com.sideReview.side.openSearch.dto

data class ContentRequestDTO(
    var tab: String?,
    var sort: String?,
    val query: String?, //TODO 쿼라만 원하는 걸로 만들어서 해당 dto와 서비스(createBlock )를 사용하도록!!
    var notQuery: List<String>?,
    var filter: MutableList<ContentRequestFilterDetail>?,
    var pagination: Int?
)

data class ContentRequestFilterDetail(
    val type: String,
    val value: List<String?>
)