package com.sideReview.side.tmdb.dto

data class WatchProvidersResponse(
    val id : Int,
    val results: Map<String, ProviderInfo>
)
data class ProviderInfo(
    val link: String,
    val flatrate: List<ProviderDetail>,
    val ads: List<ProviderDetail>?,
    val buy: List<ProviderDetail>?
)

data class ProviderDetail(
    val logo_path: String,
    val provider_id: Int,
    val provider_name: String,
    val display_priority: Int
)
