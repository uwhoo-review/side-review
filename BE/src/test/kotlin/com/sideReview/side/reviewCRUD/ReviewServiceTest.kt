package com.sideReview.side.reviewCRUD

import com.fasterxml.jackson.databind.ObjectMapper
import com.sideReview.side.review.dto.ReviewCreateDTO
import io.ktor.client.request.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.mock.web.MockHttpServletRequest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.request.RequestPostProcessor
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status


@ActiveProfiles("local")
@SpringBootTest
@AutoConfigureMockMvc
class ReviewServiceTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @Test
    fun get() {
    }

    @Test
    fun create() {
        val mapper: ObjectMapper = ObjectMapper()
        val dto: ReviewCreateDTO = ReviewCreateDTO(
            dramaId = "109958",
            content = "aaaaaa",
            spoiler = false
        )
        mockMvc.perform(
            MockMvcRequestBuilders.post("/review")
                .content(mapper.writeValueAsString(dto))
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk)

    }
}
