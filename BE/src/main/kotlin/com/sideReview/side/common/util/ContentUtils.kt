package com.sideReview.side.common.util

import com.sideReview.side.openSearch.dto.ContentDto

object ContentUtils {
    fun fill(contents: List<ContentDto>): List<ContentDto> {
        contents.filterNot { it.season.isNullOrEmpty() }.forEach { parent ->
            contents.filter { child ->
                parent.season!!.contains(child.id)
            }.map { child ->
                if (child.poster == null) {
                    child.poster = parent.poster
                }
                if (child.synopsis.isNullOrBlank()) {
                    child.synopsis = parent.synopsis
                }
            }
        }
        return contents
    }
}