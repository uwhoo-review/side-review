package com.sideReview.side.mypage.repository

import com.sideReview.side.common.entity.UserFavoritePerson
import com.sideReview.side.common.entity.UserFavoritePersonIdClass
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserFavoritePersonRepository :
    CrudRepository<UserFavoritePerson, UserFavoritePersonIdClass>