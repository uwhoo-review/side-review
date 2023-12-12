package com.sideReview.side

import com.sideReview.side.tmdb.TmdbClient
import com.sideReview.side.tmdb.TmdbContentService
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig

@SpringJUnitConfig
@SpringBootTest
@ActiveProfiles("local")
class TmdbClientTest @Autowired constructor(val tmdbContentService: TmdbContentService) {

    @Test
    fun test() {
        tmdbContentService.getMoreInfo(tmdbContentService.getAllContents())
    }
}