package com.sideReview.side.tmdb

import com.sideReview.side.common.constant.CountryEnum
import com.sideReview.side.common.document.ContentDocument
import com.sideReview.side.common.document.PersonDocument
import com.sideReview.side.common.document.Product
import com.sideReview.side.common.util.MapperUtils
import com.sideReview.side.common.util.MapperUtils.mapProviderStringToCode
import com.sideReview.side.common.util.MapperUtils.mapSeasonTODefault
import com.sideReview.side.tmdb.dto.*
import lombok.extern.slf4j.Slf4j
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import kotlin.math.min

@Service
@Slf4j
class TmdbContentService @Autowired constructor(private val tmdbClient: TmdbClient) {
    @Value("\${api.tmdb.key}")
    lateinit var accessKey: String
    private val logger = LoggerFactory.getLogger(this.javaClass)!!

    fun getAllContents(): MutableList<ContentDocument> {
        val dtoList: MutableList<TmdbContent> = mutableListOf()
        val countryList = CountryEnum.getCountryCodes()

        countryList.forEach {
            val tmdbData: TmdbResponse = tmdbClient.findAllTvShows("Bearer $accessKey", 1, it)
            dtoList.addAll(tmdbData.results)

            logger.info("[Discover] $it first: ${dtoList.size}")

            val pages: Int = min(tmdbData.total_pages, 500)
            for (page in 2..pages) {
                dtoList.addAll(tmdbClient.findAllTvShows("Bearer $accessKey", page, it).results)
            }
            logger.info("[Discover] $it final: ${dtoList.size}")
        }
        return MapperUtils.mapTmdbToDocument(dtoList)
    }

    fun getMoreInfo(docList: MutableList<ContentDocument>): List<ContentDocument> {
        val seasonDocList: MutableList<ContentDocument> = mutableListOf()

        for (i in docList.size - 1 downTo 0) {
            val doc = docList[i]
            val id = doc.id

            try {
                val providersResponse: WatchProvidersResponse =
                    tmdbClient.findOneProvider("Bearer $accessKey", id)
                doc.platform = filterPlatformList(providersResponse)
                if (doc.platform!!.isEmpty()) {
                    docList.removeAt(i)
                    logger.info("no provider : ${doc.name}")
                    continue
                }
            } catch (e: Exception) {
                logger.info("An error occurred during platform processing - $id")
            }

            try {
                val videoResponse: VideoResponse = tmdbClient.findOneVideo("Bearer $accessKey", id)
                doc.trailer = filterTrailerKey(videoResponse)
            } catch (e: Exception) {
                logger.info("An error occurred during video processing - $id")
            }

            try {
                val imageInfo: ImageResponse = tmdbClient.findOneImages("Bearer $accessKey", id)
                doc.photo = filterImages(imageInfo)
            } catch (e: Exception) {
                logger.info("An error occurred during image processing - $id")
            }

            try {
                val contentRatingResponse: ContentRatingResponse =
                    tmdbClient.findOneAge("Bearer $accessKey", id)
                doc.age = filterAge(contentRatingResponse);
            } catch (e: Exception) {
                logger.info("An error occurred during age processing - $id")
            }

            try {
                val detailResponse: DetailResponse =
                    tmdbClient.findOneContent("Bearer $accessKey", id)
                doc.season = filterDetail(detailResponse)
                seasonDocList.addAll(getSeasonContents(id, detailResponse))
                doc.episodeCount = detailResponse.seasons?.get(0)?.episode_count
                doc.production = Product(detailResponse.production_companies?.map { it.name },
                    detailResponse.origin_country?.map { CountryEnum.getNameByCode(it) })
            } catch (e: Exception) {
                logger.info("An error occurred during detail processing - $id")
            }

            try {
                val creditResponse: CreditResponse =
                    tmdbClient.findOneSeasonCredit("Bearer $accessKey", id, 1)
                doc.directors = filterDirectors(creditResponse)
            } catch (e: Exception) {
                logger.info("An error occurred during director processing - $id")
            }
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
            val directors: MutableList<String> = mutableListOf()

            try {
                val videoResponse: VideoResponse =
                    tmdbClient.findOneSeasonVideo("Bearer $accessKey", id, season)
                trailer.addAll(filterTrailerKey(videoResponse))
            } catch (e: Exception) {
                logger.info("An error occurred during season video processing - $id - $season")
            }

            try {
                val providersResponse: WatchProvidersResponse =
                    tmdbClient.findOneSeasonProvider("Bearer $accessKey", id, season)
                provider.addAll(filterPlatformList(providersResponse))
            } catch (e: Exception) {
                logger.info("An error occurred during season platform processing - $id - $season")
            }

            try {
                val seasonImageResponse: SeasonImageResponse =
                    tmdbClient.findOneSeasonImages("Bearer $accessKey", id, season)
                mapSeasonTODefault(seasonImageResponse)?.let { filterImages(it) }
                    ?.let { image.addAll(it) }
            } catch (e: Exception) {
                logger.info("An error occurred during season image processing - $id - $season")
            }

            try {
                val creditResponse: CreditResponse =
                    tmdbClient.findOneSeasonCredit("Bearer $accessKey", id, 1)
                directors.addAll(filterDirectors(creditResponse))
            } catch (e: Exception) {
                logger.info("An error occurred during director processing - $id")
            }

            docList.add(
                ContentDocument(
                    id = id + "_" + "$season",
                    sortingName = detailResponse.name,
                    name = detailResponse.name,
                    originalName = detailResponse.original_name,
                    platform = provider,
                    genre = genreList,
                    rating = seasonInfo?.vote_average?.div(2),
                    firstAirDate = seasonInfo?.air_date,
                    synopsis = seasonInfo?.overview ?: detailResponse.overview,
                    trailer = trailer,
                    photo = image,
                    poster = seasonInfo?.poster_path?.substring(1)
                        ?: detailResponse.poster_path?.substring(1),
                    avgStarRating = null,
                    season = emptyList(),
                    popularity = null,
                    episodeCount = seasonInfo?.episode_count,
                    directors = directors
                )
            )
        }

        return docList
    }

    fun getAllContentsFromPerson(personDocList: List<PersonDocument>): MutableList<ContentDocument> {
        val docList: MutableList<ContentDocument> = mutableListOf()
        personDocList.forEach {
            val id = it.id
            try {
                val response: TvCreditResponse = tmdbClient.findPersonTvCredits("Bearer $accessKey", id.toString())
                if (response.cast?.size!! > 0)
                    docList.addAll(MapperUtils.mapCastContentToDocument(response.cast))
                if (response.crew?.size!! > 0)
                    docList.addAll(MapperUtils.mapCrewContentToDocument(response.crew))
            } catch (e: Exception) {
                logger.info("An error occurred during person tv credit processing - $id")
            }
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

    private fun filterDetail(detailResponse: DetailResponse): List<com.sideReview.side.common.document.Season> {
        val seasonInfoList: MutableList<com.sideReview.side.common.document.Season> =
            mutableListOf()
        for (i in 1..detailResponse.number_of_seasons!!) {
            var seasonName = ""
            var seasonId = ""
            detailResponse.seasons?.forEach {
                if (it.season_number == i) seasonName = it.name ?: ""
            }

            if (i == 1) seasonId = detailResponse.id.toString()
            else seasonId = "${detailResponse.id}_$i"

            seasonInfoList.add(com.sideReview.side.common.document.Season(seasonId, seasonName))
        }
        return seasonInfoList
    }

    private fun filterAge(contentRatingResponse: ContentRatingResponse): String {
        contentRatingResponse.results.forEach {
            if (it.iso_3166_1 == "KR") return it.rating
        }
        return ""
    }

    private fun filterDirectors(creditResponse: CreditResponse): List<String> {
        val directors: MutableList<String> = mutableListOf()
        creditResponse.crew?.forEach {
            if (it.department == "Directing" || it.department == "Production")
                directors.add(it.name ?: "")
        }
        return directors
    }
}
