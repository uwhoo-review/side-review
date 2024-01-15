package com.sideReview.side.login

import com.sideReview.side.common.entity.UserInfo
import com.sideReview.side.common.repository.UserInfoRepository
import org.springframework.stereotype.Service
import java.io.File
import java.util.*

@Service
class NicknameService(private val userInfoRepository: UserInfoRepository) {
    fun makeNickname(type: Int): String? {
        val nounPath = "/home/ubuntu/app/BE/src/main/resources/username_noun.csv"
        val adjectivePath = "/home/ubuntu/app/BE/src/main/resources/username_adjective.csv"
        while (true) {
            val adjLine = (1..1608).random()
            val nounLine = (2..106).random()

            val username = readCsvCell(adjectivePath, adjLine, 0) + " " + readCsvCell(nounPath, nounLine, type)

            if (!userInfoRepository.existsByNickname(username)) {
                return username
            }
        }
    }
    fun editNickname(id: String, name : String){
        val userInfo : Optional<UserInfo> = userInfoRepository.findById(id)
        if(!userInfoRepository.existsByNickname(name)){
            userInfo.get().nickname = name
            userInfoRepository.save(userInfo.get())
        }else{
            //TODO: 예외 처리
            throw Exception("Duplicated nickname")
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