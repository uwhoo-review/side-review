package com.sideReview.side.tmdb

import com.sideReview.side.common.document.ContentDocument
import com.sideReview.side.common.util.MapperUtil
import com.sideReview.side.common.util.MapperUtil.mapProviderStringToCode
import com.sideReview.side.common.util.MapperUtil.mapSeasonTODefault
import com.sideReview.side.tmdb.dto.*
import lombok.extern.slf4j.Slf4j
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.lang.Exception

@Service
@Slf4j
class TmdbContentService @Autowired constructor(private val tmdbClient: TmdbClient) {
    @Value("\${api.tmdb.key}")
    lateinit var accessKey: String
    private val logger = LoggerFactory.getLogger(this.javaClass)!!

    fun getAllContents(): List<ContentDocument> {
        val dtoList: MutableList<TmdbContent> = mutableListOf()
        val tmdbData: TmdbResponse = tmdbClient.findAllTvShows("Bearer $accessKey", 1)
        dtoList.addAll(tmdbData.results)
        logger.info("[Discover] first: " + dtoList.size.toString())

        //val pages: Int = tmdbData.total_pages
        val pages: Int = 500
        for (page in 2..pages) {
            dtoList.addAll(tmdbClient.findAllTvShows("Bearer $accessKey", page).results)
        }
        logger.info("[Discover] final: " + dtoList.size.toString())
        return MapperUtil.mapTmdbToDocument(dtoList)
    }

    fun getMoreInfo(docList: List<ContentDocument>): List<ContentDocument> {
        var i: Int = 1;
        val seasonDocList: MutableList<ContentDocument> = mutableListOf()

        for (doc in docList) {
            val id = doc.id

            try {
                val providersResponse: WatchProvidersResponse = tmdbClient.findOneProvider("Bearer $accessKey", id)
                doc.platform = filterPlatformList(providersResponse)
            }catch (e : Exception){
                logger.info("An error occurred during platform processing - $id")
            }

            try {
                val videoResponse: VideoResponse = tmdbClient.findOneVideo("Bearer $accessKey", id)
                doc.trailer = filterTrailerKey(videoResponse)
            } catch (e : Exception){
                logger.info("An error occurred during video processing - $id")
            }

            try{
                val imageInfo: ImageResponse = tmdbClient.findOneImages("Bearer $accessKey", id)
                doc.photo = filterImages(imageInfo)
            }catch (e : Exception){
                logger.info("An error occurred during image processing - $id")
            }

            try{
                val detailResponse: DetailResponse = tmdbClient.findOneContent("Bearer $accessKey", id)
                doc.season = filterDetail(detailResponse)
                seasonDocList.addAll(getSeasonContents(id, detailResponse))
                doc.episodeCount = detailResponse.seasons?.get(0)?.episode_count
            }catch (e : Exception){
                logger.info("An error occurred during detail processing - $id")
            }

            if (i % 100 == 0) logger.info("Get more info processing ... $i / ${docList.size}")
            i++
        }
        seasonDocList.addAll(docList)
        return seasonDocList
    }

    fun getSeasonContents(id: String, detailResponse: DetailResponse): List<ContentDocument> {
        val docList: MutableList<ContentDocument> = mutableListOf()
        val genreList = detailResponse.genres?.map { it.id }

        for (season in 2..detailResponse.number_of_seasons!!) {
            val seasonInfo = detailResponse.seasons?.find { it.season_number == season }
            val trailer: MutableList<String> = mutableListOf()
            val provider: MutableList<Int> = mutableListOf()
            val image: MutableList<String> = mutableListOf()

            try{
                val videoResponse: VideoResponse = tmdbClient.findOneSeasonVideo("Bearer $accessKey", id, season)
                trailer.addAll(filterTrailerKey(videoResponse))
            }catch (e : Exception){
                logger.info("An error occurred during season video processing - $id - $season")
            }

            try {
                val providersResponse: WatchProvidersResponse = tmdbClient.findOneSeasonProvider("Bearer $accessKey", id, season)
                provider.addAll(filterPlatformList(providersResponse))
            }catch (e : Exception){
                logger.info("An error occurred during season platform processing - $id - $season")
            }

            try {
                val seasonImageResponse: SeasonImageResponse = tmdbClient.findOneSeasonImages("Bearer $accessKey", id, season)
                mapSeasonTODefault(seasonImageResponse)?.let { filterImages(it) }?.let { image.addAll(it) }
            }catch (e : Exception){
                logger.info("An error occurred during season image processing - $id - $season")
            }

            docList.add(
                ContentDocument(
                    id = id + "_" + season.toString(),
                    sortingName = detailResponse.name,
                    name = detailResponse.name,
                    platform = provider,
                    genre = genreList,
                    rating = seasonInfo?.vote_average?.div(2),
                    firstAirDate = seasonInfo?.air_date,
                    synopsis = seasonInfo?.overview,
                    trailer = trailer,
                    photo = image,
                    poster = seasonInfo?.poster_path?.substring(1),
                    avgStarRating = null,
                    season = null,
                    popularity = null,
                    episodeCount = seasonInfo?.episode_count
                )
            )
        }

        return docList
    }

    private fun filterTrailerKey(videoResponse: VideoResponse): List<String> {
        videoResponse.results.sortedWith(compareBy({ it.type == "Trailer" }, { it.published_at }))
        val videoList: MutableList<String> = mutableListOf()
        for (video in videoResponse.results) {
            if (video.official) {
                videoList.add(video.key)
            }
        }
        return videoList
    }

    private fun filterPlatformList(providersResponse: WatchProvidersResponse): List<Int> {
        val providerInfo: ProviderInfo? = providersResponse.results["KR"]
        val flatrateSize = providerInfo?.flatrate?.size
        val providerList: MutableList<String> = mutableListOf()
        var providerCodeList: List<Int> = emptyList()

        if (providersResponse.results.isNotEmpty() && flatrateSize != null) {
            for (i in 0..<flatrateSize) {
                val provider = providerInfo.flatrate[i].provider_name.split(" ")[0]
                if (!providerList.contains(provider)) providerList.add(provider)
            }
            providerCodeList = mapProviderStringToCode(providerList)

        }
        return providerCodeList
    }

    private fun filterImages(imageResponse: ImageResponse): List<String> {
        val imageInfoList: List<ImageInfo> = imageResponse.backdrops
        val photoList: MutableList<String> = mutableListOf()

        imageInfoList.forEach {
            photoList.add(it.file_path.substring(1))
        }
        return photoList
    }

    private fun filterDetail(detailResponse: DetailResponse): List<String> {
        val seasonList: MutableList<String> = mutableListOf()
        for (i in 2..detailResponse.number_of_seasons!!)
            seasonList.add(detailResponse.id.toString() + "_" + i)

        return seasonList
    }
}
