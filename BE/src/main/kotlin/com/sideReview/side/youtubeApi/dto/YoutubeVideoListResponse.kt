package com.sideReview.side.youtubeApi.dto

data class YoutubeVideoListResponse(
    var kind: String = "",
    var etag: String = "",
    var items: MutableList<YoutubeVideoListItem> = mutableListOf(),
    var nextPageToken: String? = "",
    var prevPageToken: String? = "",
    var pageInfo: YoutubeResponsePageInfo
) {
    init {
        // drama만 필터링
        items.removeAll {
            !it.topicDetails.topicCategories.containsAll(
                listOf(
                    "https://en.wikipedia.org/wiki/Television_program",
                    "https://en.wikipedia.org/wiki/Film",
                    "https://en.wikipedia.org/wiki/Entertainment"
                )
            )
        }
    }
}

data class YoutubeVideoListItem(
    var kind: String = "",
    var etag: String = "",
    var id: String = "",
    var topicDetails: YoutubeVideoListItemTopicDetail = YoutubeVideoListItemTopicDetail()
)

data class YoutubeVideoListItemTopicDetail(var topicCategories: List<String> = emptyList())
