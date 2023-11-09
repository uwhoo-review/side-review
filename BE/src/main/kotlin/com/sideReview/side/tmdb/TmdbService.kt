package com.sideReview.side.tmdb

import com.sideReview.side.common.constant.ProviderEnum
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
        return tmdbClient.getTvShows("Bearer $accessKey",1, 213)
    }

    //sample api를 위한 메서드
    fun getMainContents(tab : String): MainContentDto {
        var tmdb = tmdbClient.getTvShows("Bearer $accessKey",1, 213)
        val popular: MutableList<ContentDto> = mutableListOf()
        val latest: MutableList<ContentDto> = mutableListOf()
        val size : Int = when {
            tab == "main" -> 20
            else -> tmdb.results.indices.count()
            //TODO: latest, popular 경우의 case 확장
        }

        for(i in 0..size-1){
            val content : TbdbContent = tmdb.results[i]
            val contentDto : ContentDto = ContentDto(
                id = content.id,
                name = content.name,
                poster = content.poster_path,
                synopsis = content.overview,
                platform = listOf("netflix"),
                genre = content.genre_ids,
                year = content.first_air_date?.substring(0, 4)
            )
            if(i < 10) latest.add(contentDto)
            else popular.add(contentDto)
        }
        return MainContentDto(latest = latest, popular = popular)
    }

    fun getContentsAll() : List<TbdbContent>{
        val dtoList : MutableList<TbdbContent> = mutableListOf()

        for(provider in ProviderEnum.values()){
            val tmdbData : TmdbResponse = tmdbClient.getTvShows("Bearer $accessKey",1, provider.value)
            dtoList.addAll(tmdbData.results)
            logger.info("("+ provider + ")first: "+dtoList.size.toString())

            val pages : Int = tmdbData.total_pages
            for(page in 2..pages){
                dtoList.addAll(tmdbClient.getTvShows("Bearer $accessKey",page, provider.value).results)
                logger.info("processing...: " + dtoList.size.toString())
            }
        }
        logger.info("final: "+ dtoList.size.toString())

        //TODO: 중간에 플랫폼 정보 추가하면서 데이터로 맵핑
        return dtoList
    }
}