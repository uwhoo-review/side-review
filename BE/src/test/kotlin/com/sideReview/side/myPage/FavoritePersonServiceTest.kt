package com.sideReview.side.myPage

import com.sideReview.side.common.entity.UserInfo
import com.sideReview.side.common.repository.UserInfoRepository
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.mockito.BDDMockito.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
@ActiveProfiles("local")
class FavoritePersonServiceTest @Autowired constructor(
    val myPageService: MyPageService,
    val userInfoRepository: UserInfoRepository
) {

    @Test
    @Transactional
    @DisplayName("좋아하는 인물 저장")
    fun saveFavoritePersonTest() {
        val user = UserInfo(
            "testUserId",
            "naver",
            "testNickName",
            null,
            null,
            null,
            null
        )
        userInfoRepository.save(user)

        println("--------------------- start -----------------------")
        val personId: String = "88123"
        val result = myPageService.saveFavoritePerson("testUserId", personId)
        assert(result.personId == "88123")
        assert(result.userInfo == user)
        println(result)
    }
}