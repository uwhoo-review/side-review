package com.sideReview.side.names

import com.sideReview.side.names.entity.Names
import org.springframework.data.jpa.repository.JpaRepository

interface NamesRepository : JpaRepository<Names, Int> {
    fun findKoreanNameByEnglishName(name : String): Names
}