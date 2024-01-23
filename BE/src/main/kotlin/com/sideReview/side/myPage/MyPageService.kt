package com.sideReview.side.myPage

import com.sideReview.side.common.dto.PageInfoDto
import com.sideReview.side.common.entity.UserFavoritePerson
import com.sideReview.side.common.repository.UserInfoRepository
import com.sideReview.side.common.util.MapperUtils
import com.sideReview.side.myPage.dto.FavoriteContentPageDto
import com.sideReview.side.myPage.dto.FavoritePersonDto
import com.sideReview.side.myPage.repository.UserFavoritePersonRepository
import com.sideReview.side.openSearch.OpenSearchDetailService
import com.sideReview.side.openSearch.OpensearchClient
import com.sideReview.side.openSearch.PersonService
import com.sideReview.side.review.UserStarRatingRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class MyPageService(
    val opensearchClient: OpensearchClient,
    val openSearchDetailService: OpenSearchDetailService,
    val userStarRatingRepository: UserStarRatingRepository,
    val userFavoritePersonRepository: UserFavoritePersonRepository,
    val userInfoRepository: UserInfoRepository,
    val personService: PersonService
) {
    suspend fun getKeywordContent(
        userId: String,
        keyword: String,
        page: Int,
        size: Int
    ): FavoriteContentPageDto {
        val contents = opensearchClient.getContents(keyword, page, size)
        contents.content.forEach {
            it.rating = userStarRatingRepository.findOneByTargetIdAndWriterId(
                it.id,
                userId
            )?.rating.toString()
        }
        return contents
    }

    suspend fun getKeywordPerson(
        keyword: String,
        page: Int,
        size: Int
    ): FavoritePersonDto {
        val matchPerson =
            personService.searchMatch(keyword, (page - 1) * size, size)
        val matchPersonDto = MapperUtils.parseToPersonDto(matchPerson)
        val personDtoList = openSearchDetailService.fillCastCrew(matchPersonDto)
        val total = matchPerson.hits?.total?.value?.toInt() ?: 0
        val totalPages = if (total % size == 0) total / size else total / size + 1
        return FavoritePersonDto(personDtoList, PageInfoDto(total, totalPages, page))
    }

    @Transactional
    fun saveFavoritePerson(userId: String, personId: String): UserFavoritePerson {
        val user = userInfoRepository.getReferenceById(userId)
        return userFavoritePersonRepository.save(
            UserFavoritePerson(personId = personId, userInfo = user)
        )
    }
}