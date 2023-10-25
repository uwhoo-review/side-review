package com.sideReview.side.youtubeApi.dto

data class YoutubeResponse(
    var kind: String = "",
    var etag: String = "",
    var items: MutableList<YoutubeResponseItem> = mutableListOf()
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

data class YoutubeResponseItem(
    var kind: String = "",
    var etag: String = "",
    var id: String = "",
    var topicDetails: YoutubeResponseItemTopicDetail = YoutubeResponseItemTopicDetail()
)

data class YoutubeResponseItemTopicDetail(var topicCategories: List<String> = emptyList())
