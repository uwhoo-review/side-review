package com.sideReview.side.common.util

import com.sideReview.side.openSearch.dto.ContentDto

object ContentUtils {
    fun fill(contents: List<ContentDto>): List<ContentDto> {
        for (content: ContentDto in contents) {
            if (!content.season.isNullOrEmpty()) {
                val target = contents.filter {
                    content.season.contains(it.id)
                }
                target.map {
                    if (it.poster == null) {
                        it.poster = content.poster
                    }
                    if (it.synopsis.isNullOrBlank()) {
                        it.synopsis = content.synopsis
                    }
                }
            }
        }
        println(contents.toString())
        return contents
    }
}