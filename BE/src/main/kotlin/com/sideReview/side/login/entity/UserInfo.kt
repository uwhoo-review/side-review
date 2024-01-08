package com.sideReview.side.login.entity

import javax.persistence.*

@Entity
@Table(name = "user_info", catalog = "meta")
data class UserInfo(

    @Id @Column(name = "user_id", length = 50, nullable = false)
    val userId: String,

    @Column(name = "login_type", length = 10, nullable = false)
    val loginType: String,

    @Column(name = "nickname", length = 10)
    val nickname: String,

    @Column(name = "prefer_ott", length = 100)
    val preferOtt: String?,

    @Column(name = "prefer_genre", length = 100)
    val preferGenre: String?,

    @OneToMany(mappedBy = "userInfo")
    val favoriteContent: List<UserFavoriteContent>?,

    @OneToMany(mappedBy = "userInfo")
    val favoritePerson: List<UserFavoritePerson>?
)