package com.sideReview.side.openSearch

import kotlinx.coroutines.runBlocking
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Component

@Component
class IndexInitializer(val service: OpenSearchService) : ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        println("::: Init. Create OpenSearch Index :::")
        runBlocking {
            service.initIndex()
        }
        println(":::::::::::::::::::::::::::::::::::::")
    }
}