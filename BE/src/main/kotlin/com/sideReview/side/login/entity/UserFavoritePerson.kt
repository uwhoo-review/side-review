package com.sideReview.side.login.entity

import java.io.Serializable
import javax.persistence.*

@Entity
@Table(name = "user_favorite_person", catalog = "meta")
@IdClass(UserFavoritePersonIdClass::class)
data class UserFavoritePerson(
//    @Id @Column(name = "user_id", length = 50, nullable = false)
//    val userId: String,

    @Id
    @Column(name = "person_id", length = 36, nullable = false)
    val personId: String,

    @Id
    @ManyToOne(fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
    @JoinColumn(name = "user_id")
    val userInfo: UserInfo
)

data class UserFavoritePersonIdClass(
    var userInfo: String = "",
    var personId: String = ""
) : Serializable