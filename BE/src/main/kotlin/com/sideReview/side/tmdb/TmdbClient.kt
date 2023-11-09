package com.sideReview.side.tmdb

import com.sideReview.side.tmdb.dto.TmdbResponse
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestParam

@FeignClient(name = "themoviedb", url = "https://api.themoviedb.org/3")
interface TmdbClient {

    @GetMapping("/discover/tv")
    fun getTvShows(@RequestHeader("Authorization") apiKey: String,
                          @RequestParam("page") page: Int,
                          @RequestParam("with_networks") withNetworks: Int,
                          @RequestParam("include_adult") includeAdult: Boolean = false,
                          @RequestParam("include_null_first_air_dates") includeNullFirstAirDates: Boolean = false,
                          @RequestParam("language") language: String = "ko-KR",
                          @RequestParam("sort_by") sortBy: String = "primary_release_date.desc",
                          @RequestParam("watch_region") watchRegion: String = "KR",
                          @RequestParam("with_original_language") withOriginalLanguage: String = "ko"
    ): TmdbResponse


}