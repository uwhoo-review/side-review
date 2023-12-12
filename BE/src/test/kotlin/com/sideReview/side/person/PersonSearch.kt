package com.sideReview.side.person

import com.sideReview.side.common.util.MapperUtils
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles

@ActiveProfiles("local")
@SpringBootTest
class PersonSearch @Autowired constructor(val personService: PersonService) {

    @Test
    fun get() {
        runBlocking {
            println(MapperUtils.parseToContentDto(personService.get("78798")))
        }
    }
}