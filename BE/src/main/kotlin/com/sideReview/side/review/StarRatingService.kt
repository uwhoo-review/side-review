package com.sideReview.side.review

import com.sideReview.side.review.dto.StarRatingCreateDto
import com.sideReview.side.review.dto.StarRatingDto
import com.sideReview.side.review.dto.StarRatingUpdateDto
import com.sideReview.side.review.entity.UserStarRating
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
@Service
class StarRatingService (val userStarRatingRepository: UserStarRatingRepository){
    @Transactional
    fun saveStarRating(dto: StarRatingCreateDto, ip: String) {
        if(!userStarRatingRepository.existsByTargetIdAndWriterId(dto.contentId, ip)){
            userStarRatingRepository.save(
                UserStarRating(
                    targetId = dto.contentId,
                    writerId = ip,
                    rating = dto.rating
                )
            )
        }else{
            // TODO : exception handling
            throw Exception("Duplicated star rating request")
        }
    }

    @Transactional
    fun editStarRating(dto: StarRatingUpdateDto, ip: String) {
        userStarRatingRepository.save(
            UserStarRating(
                id = dto.ratingId,
                targetId = dto.contentId,
                writerId = ip,
                rating = dto.rating
            )
        )
    }

    @Transactional
    fun findStarRating(id : String, ip :String) : StarRatingDto {
        val rating : UserStarRating = userStarRatingRepository.findOneByTargetIdAndWriterId(id, ip)
        val total : Int = userStarRatingRepository.countByTargetId(id)
        return StarRatingDto(total, rating.rating, rating.id)
    }

    @Transactional
    fun deleteStartRating(id : String, ip :String) {
        userStarRatingRepository.deleteByTargetIdAndWriterId(id, ip)
    }
}