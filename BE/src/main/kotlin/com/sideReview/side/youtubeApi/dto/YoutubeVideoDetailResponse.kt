package com.sideReview.side.youtubeApi.dto

data class YoutubeVideoDetailResponse(
    var kind: String = "",
    var etag: String = "",
    var items: MutableList<YoutubeVideoDetailItem> = mutableListOf(),
    var nextPageToken: String? = "",
    var prevPageToken: String? = "",
    var pageInfo: YoutubeResponsePageInfo
)

data class YoutubeVideoDetailItem(
    var kind: String = "",
    var etag: String = "",
    var id: String = "",
    var snippet: YoutubeVideoDetailItemSnippet
)

data class YoutubeVideoDetailItemSnippet(
    var publishedAt: String = "",
    var channelId: String = "",
    var title: String = "",
    var description: String = "",
    var thumbnails: YoutubeVideoDetailItemSnippetThumbnail,
    var channelTitle: String = "",
    var tags: List<String> = emptyList(),
    var categoryId: String = "",
    var liveBroadcastContent: String = "",
    var defaultLanguage: String = "",
    var localized: YoutubeVideoDetailItemSnippetLocalized,
    var defaultAudioLanguage: String = ""
)

data class YoutubeVideoDetailItemSnippetThumbnail(
    var default: YoutubeVideoDetailItemSnippetThumbnailDetail,
    var medium: YoutubeVideoDetailItemSnippetThumbnailDetail,
    var high: YoutubeVideoDetailItemSnippetThumbnailDetail,
    var standard: YoutubeVideoDetailItemSnippetThumbnailDetail,
    var maxres: YoutubeVideoDetailItemSnippetThumbnailDetail
)

data class YoutubeVideoDetailItemSnippetThumbnailDetail(
    var url: String = "",
    var width: Int = 0,
    var height: Int = 0
)

data class YoutubeVideoDetailItemSnippetLocalized(
    var title: String = "",
    var description: String = ""
)