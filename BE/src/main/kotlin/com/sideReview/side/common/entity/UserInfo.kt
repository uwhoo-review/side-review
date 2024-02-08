package com.sideReview.side.common.entity

import org.hibernate.annotations.DynamicUpdate
import javax.persistence.*

@Entity
@Table(name = "user_info", catalog = "meta")
@DynamicUpdate
data class UserInfo(

    @Id @Column(name = "user_id", length = 50, nullable = false)
    val userId: String,

    @Column(name = "login_type", length = 10, nullable = false)
    val loginType: String,

    @Column(name = "nickname", length = 10)
    var nickname: String,

    @Column(name = "profile", length = 100)
    var profile: String,

    @Column(name = "prefer_ott", length = 100)
    var preferOtt: String?,

    @Column(name = "prefer_genre", length = 100)
    var preferGenre: String?,

    @OneToMany(mappedBy = "userInfo", cascade = [CascadeType.ALL])
    val favoriteContent: List<UserFavoriteContent>?,

    @OneToMany(mappedBy = "userInfo", cascade = [CascadeType.ALL])
    val favoritePerson: List<UserFavoritePerson>?
)