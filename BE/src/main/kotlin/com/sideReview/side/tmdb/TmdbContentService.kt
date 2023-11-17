package com.sideReview.side.tmdb

import com.sideReview.side.common.util.MapperUtil
import com.sideReview.side.common.util.MapperUtil.mapGenreCodeToString
import com.sideReview.side.common.util.MapperUtil.mapProviderCodeToString
import com.sideReview.side.common.util.MapperUtil.mapProviderStringToCode
import com.sideReview.side.common.document.ContentDocument
import com.sideReview.side.common.util.MapperUtil.mapSeasonTODefault
import com.sideReview.side.tmdb.dto.*
import lombok.extern.slf4j.Slf4j
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
@Slf4j
class TmdbContentService @Autowired constructor(private val tmdbClient: TmdbClient){
    @Value("\${api.tmdb.key}")
    lateinit var accessKey: String
    private val logger = LoggerFactory.getLogger(this.javaClass)!!

    fun getAllContents() : List<ContentDocument>{
        val dtoList : MutableList<TmdbContent> = mutableListOf()
        val tmdbData : TmdbResponse = tmdbClient.findAllTvShows("Bearer $accessKey",1)
        dtoList.addAll(tmdbData.results)
        logger.info("[Discover] first: "+dtoList.size.toString())

        val pages : Int = tmdbData.total_pages
        for(page in 2..pages){
            dtoList.addAll(tmdbClient.findAllTvShows("Bearer $accessKey",page).results)
            if(dtoList.size%100 == 0) break;
        }
        logger.info("[Discover] final: "+ dtoList.size.toString())
        return MapperUtil.mapTmdbToDocument(dtoList)
    }

    fun getMoreInfo(docList : List<ContentDocument>) : List<ContentDocument>{
        var i : Int = 1;
        val seasonDocList : MutableList<ContentDocument> = mutableListOf()

        for(doc in docList){
            val id = doc.id.toInt()
            val providersResponse : WatchProvidersResponse = tmdbClient.findOneProvider("Bearer $accessKey", id)
            doc.platform = filterPlatformList(providersResponse)

            val videoResponse : VideoResponse = tmdbClient.findOneVideo("Bearer $accessKey", id)
            doc.trailer = filterTrailerKey(videoResponse)

            val imageInfo : ImageResponse = tmdbClient.findOneImages("Bearer $accessKey", id)
            doc.photo = filterImages(imageInfo)

            val detailResponse : DetailResponse = tmdbClient.findOneContent("Bearer $accessKey", id)
            doc.season = filterDetail(detailResponse)
            seasonDocList.addAll(getSeasonContents(id, detailResponse))

            if(i%100 == 0) logger.info("Get more info processing ... $i / ${docList.size}")
            i++
        }
        seasonDocList.addAll(docList)
        return seasonDocList
    }
    fun getSeasonContents(id : Int, detailResponse: DetailResponse) : List<ContentDocument>{
        val docList : MutableList<ContentDocument> = mutableListOf()

        for(season in 2 ..detailResponse.number_of_seasons!!)
        {
            val seasonInfo = detailResponse.seasons?.find { it.season_number == season }


            val videoResponse : VideoResponse = tmdbClient.findOneSeasonVideo("Bearer $accessKey", id, season)
            val providersResponse : WatchProvidersResponse = tmdbClient.findOneSeasonProvider("Bearer $accessKey", id, season)
            val seasonImageResponse : SeasonImageResponse = tmdbClient.findOneSeasonImages("Bearer $accessKey", id, season)

            docList.add(
                ContentDocument(
                    id = id.toString() + "_" + season.toString(),
                    name = detailResponse.name,
                    platform = filterPlatformList(providersResponse),
                    genre = null,
                    rating = null,
                    firstAirDate = seasonInfo?.air_date,
                    synopsis = null,
                    trailer = filterTrailerKey(videoResponse),
                    photo =  mapSeasonTODefault(seasonImageResponse)?.let { filterImages(it) },
                    poster = seasonInfo?.poster_path,
                    avgStarRating = null,
                    season = null,
                    popularity = null
                )
            )
        }

        return docList
    }

    private fun filterTrailerKey(videoResponse: VideoResponse) : List<String> {
        videoResponse.results.sortedWith(compareBy({ it.type == "Trailer" }, { it.published_at }))
        val videoList : MutableList<String> = mutableListOf()
        for (video in videoResponse.results){
            if(video.official){
                videoList.add(video.key)
            }
        }
        return videoList
    }

    private fun filterPlatformList(providersResponse : WatchProvidersResponse) : List<Int> {
        val providerInfo: ProviderInfo ?= providersResponse.results["KR"]
        val flatrateSize = providerInfo?.flatrate?.size
        val providerList : MutableList<String> = mutableListOf()
        var providerCodeList : List<Int> = emptyList()

        if(providersResponse.results.isNotEmpty() && flatrateSize != null) {
            for (i in 0..< flatrateSize) {
                val provider = providerInfo.flatrate[i].provider_name.split(" ")[0]
                if (!providerList.contains(provider)) providerList.add(provider)
            }
            providerCodeList = mapProviderStringToCode(providerList)

        }
        return providerCodeList
    }

    private fun filterImages(imageResponse: ImageResponse) : List<String>{
        val imageInfoList : List<ImageInfo> = imageResponse.backdrops
        val photoList : MutableList<String> = mutableListOf()

        imageInfoList.forEach {
            photoList.add(it.file_path.substring(1))
        }
        return photoList
    }

    private fun filterDetail(detailResponse: DetailResponse) : List<String>{
        val seasonList : MutableList<String> = mutableListOf()
        for(i in 2 ..detailResponse.number_of_seasons!!)
            seasonList.add(detailResponse.id.toString() + "_" + i)

        return seasonList
    }
}