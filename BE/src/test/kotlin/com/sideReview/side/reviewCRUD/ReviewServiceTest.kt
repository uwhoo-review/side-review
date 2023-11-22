package com.sideReview.side.reviewCRUD

import com.fasterxml.jackson.databind.ObjectMapper
import com.sideReview.side.review.dto.ReviewCreateDTO
import com.sideReview.side.review.dto.ReviewEvaDTO
import io.ktor.client.request.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultHandlers
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status


@ActiveProfiles("local")
@SpringBootTest
@AutoConfigureMockMvc
class ReviewServiceTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @Test
    fun get() {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/review?id=109958")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk).andDo(MockMvcResultHandlers.print())
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

    @Test
    fun eval() {
        val mapper: ObjectMapper = ObjectMapper()
        val dto: ReviewEvaDTO = ReviewEvaDTO(
            reviewId = "070264a6-53fc-4dd5-af03-2c9603c03687",
            eval = 1
        )
        mockMvc.perform(
            MockMvcRequestBuilders.put("/review")
                .content(mapper.writeValueAsString(dto))
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk).andDo(MockMvcResultHandlers.print())
    }
}
