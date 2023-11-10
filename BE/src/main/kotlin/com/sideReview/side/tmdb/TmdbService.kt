package com.sideReview.side.tmdb

import com.sideReview.side.common.util.MapperUtil
import com.sideReview.side.common.util.MapperUtil.mapGenreCodeToString
import com.sideReview.side.tmdb.document.ContentDocument
import com.sideReview.side.tmdb.dto.*
import lombok.extern.slf4j.Slf4j
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
@Slf4j
class TmdbService @Autowired constructor(private val tmdbClient: TmdbClient){
    @Value("\${api.tmdb.key}")
    lateinit var accessKey: String
    private val logger = LoggerFactory.getLogger(this.javaClass)!!

    fun putSearchServer(): TmdbResponse {
        return tmdbClient.findAllTvShows("Bearer $accessKey",1)
    }

    //sample api를 위한 메서드
    fun getMainContents(tab : String): MainContentDto {
        var tmdb = tmdbClient.findAllTvShows("Bearer $accessKey",1)
        val popular: MutableList<ContentDto> = mutableListOf()
        val latest: MutableList<ContentDto> = mutableListOf()
        val size : Int = when {
            tab == "main" -> 20
            else -> tmdb.results.indices.count()
            //TODO: latest, popular 경우의 case 확장
        }

        for(i in 0..<size){
            val content : TbdbContent = tmdb.results[i]
            val genreList : List<String> = mapGenreCodeToString(content.genre_ids)
            val contentDto : ContentDto = ContentDto(
                id = content.id,
                name = content.name,
                poster = content.poster_path,
                synopsis = content.overview,
                platform = listOf("netflix"),
                genre = genreList,
                year = content.first_air_date?.substring(0, 4)
            )
            if(i < 10) latest.add(contentDto)
            else popular.add(contentDto)
        }
        return MainContentDto(latest = latest, popular = popular)
    }

    fun getAllContents() : List<ContentDocument>{
        val dtoList : MutableList<TbdbContent> = mutableListOf()
        val tmdbData : TmdbResponse = tmdbClient.findAllTvShows("Bearer $accessKey",1)
        dtoList.addAll(tmdbData.results)
        logger.info("[Discover] first: "+dtoList.size.toString())

        val pages : Int = tmdbData.total_pages
        for(page in 2..pages){
            dtoList.addAll(tmdbClient.findAllTvShows("Bearer $accessKey",page).results)
            if(dtoList.size%1000 == 0) logger.info("[Discover] processing...: "+ dtoList.size.toString())
        }
        logger.info("[Discover] final: "+ dtoList.size.toString())
        return MapperUtil.mapTmdbToDocument(dtoList)
    }

    fun getAllProviderById(docList : List<ContentDocument>) : List<ContentDocument>{
        var i : Int = 0;
        for(doc in docList){
            val id = doc.id
            val providersResponse : WatchProvidersResponse = tmdbClient.findOneProvider("Bearer $accessKey", id)
            val providerInfo: ProviderInfo ?= providersResponse.results["KR"]
            val flatrateSize = providerInfo?.flatrate?.size
            val providerList : MutableList<String> = mutableListOf()

            if(providersResponse.results.isNotEmpty() && flatrateSize != null) {
                for (i in 0..<flatrateSize) {
                    val provider = providerInfo.flatrate[i].provider_name.split(" ")[0]
                    if (!providerList.contains(provider)) providerList.add(provider)
                }
                doc.platform = providerList
            }
            // 테스트용 break
            if(i%100 == 0) logger.info("[Provider] processing...: $i")
            i++
            if(i == 500) break;
        }
        return docList
    }
}