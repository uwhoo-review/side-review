package com.sideReview.side.person

import com.sideReview.side.person.entity.Names
import org.springframework.data.jpa.repository.JpaRepository

interface NamesRepository : JpaRepository<Names, Int> {
    fun findKoreanNameByEnglishName(name : String): Names
}