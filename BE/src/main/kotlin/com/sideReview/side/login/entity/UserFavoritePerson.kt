package com.sideReview.side.login.entity

import java.io.Serializable
import javax.persistence.*

@Entity
@Table(name = "user_favorite_person", catalog = "meta")
@IdClass(UserFavoritePersonIdClass::class)
data class UserFavoritePerson(
    @Id @Column(name = "user_id", length = 50, nullable = false)
    val userId: String,

    @Id
    @Column(name = "person_id", length = 36, nullable = false)
    val personId: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_Id")
    val userInfo: UserInfo
)

data class UserFavoritePersonIdClass(
    var userId: String = "",
    var personId: String = ""
) : Serializable