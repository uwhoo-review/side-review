package com.sideReview.side.tmdb

import com.sideReview.side.tmdb.document.ContentDocument
import org.springframework.stereotype.Service

@Service
class TmdbProcessingService(private val tmdbService: TmdbService) {
    //content document 만드는 서비스

    fun getContents() : List<ContentDocument> {
        // & provider 만큼 discover 1 보내고 전체 페이지 수 만큼 나머지 호출
        // id 마다 photo, video
        // 추후 출연자 정보
        val documentList : MutableList<ContentDocument> = mutableListOf()
        val dtoList : List<ContentDocument> = tmdbService.getAllContents()
        return documentList
    }
}