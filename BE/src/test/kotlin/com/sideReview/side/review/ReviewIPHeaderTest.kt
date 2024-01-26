package com.sideReview.side.review

import com.fasterxml.jackson.databind.ObjectMapper
import com.sideReview.side.review.dto.ReviewCreateDto
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
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
@ActiveProfiles("local")
@AutoConfigureMockMvc
class ReviewIPHeaderTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @Test
    @Transactional
    fun ipTest() {
        // Test에는 안쪽으로 들어갔을 때 header 검사를 할 수 없어서 controller나 filter에 print문을 추가해야 함.
        val body = ReviewCreateDto(
            "dramaIdTest",
            "review content",
            spoiler = false
        )
        val mapper = ObjectMapper()

        mockMvc.perform(
            MockMvcRequestBuilders.post("/review")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    mapper.writeValueAsString(body)
                )
        ).andExpect(status().isOk).andDo(MockMvcResultHandlers.print())
    }
}