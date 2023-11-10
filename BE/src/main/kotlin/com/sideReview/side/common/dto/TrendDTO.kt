package com.sideReview.side.common.dto

import com.sideReview.side.youtubeApi.dto.YoutubeVideoDetailResponse
import kotlinx.serialization.Serializable
import java.util.*

@Serializable
class TrendDTO {
    var id: String = ""
    var name: String = ""
    var platform: String = ""

    constructor(r: YoutubeVideoDetailResponse) {
        // Generate a random UUID
        val uuid = UUID.randomUUID()
        this.id = uuid.toString()
        this.name = r.items[0].snippet.title
        this.platform = ""
    }
}
