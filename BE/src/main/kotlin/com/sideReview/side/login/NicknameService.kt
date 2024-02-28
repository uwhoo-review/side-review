package com.sideReview.side.login

import com.sideReview.side.common.entity.UserInfo
import com.sideReview.side.common.repository.UserInfoRepository
import org.springframework.stereotype.Service
import java.io.File
import java.util.*

@Service
class NicknameService(private val userInfoRepository: UserInfoRepository) {
    fun makeNickname(type: Int): String {
        val nounPath = "/home/ubuntu/app/BE/src/main/resources/username_noun.csv"
        val adjectivePath = "/home/ubuntu/app/BE/src/main/resources/username_adjective.csv"
        while (true) {
            val adjLine = (1..1608).random()
            val nounLine = (2..112).random()

            val username = readCsvCell(adjectivePath, adjLine, 0) + " " + readCsvCell(nounPath, nounLine, type)

            if (!userInfoRepository.existsByNickname(username)) {
                return username
            }
        }
    }
    fun editNickname(id: String, name : String){
        if(!userInfoRepository.existsByNickname(name)){
            val userInfo : UserInfo = userInfoRepository.findById(id).get()
            userInfo.nickname = name
            userInfoRepository.save(userInfo)
        }else{
            throw NickNameDuplicateException("Nickname update failed. Duplicated nickname")
        }
    }
    private fun readCsvCell(filePath: String, lineNumber: Int, columnIndex: Int): String? {
        return try {
            val file = File(filePath)
            val line = file.bufferedReader().readLines().getOrNull(lineNumber - 1)
            line?.split(",")?.getOrNull(columnIndex)
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}