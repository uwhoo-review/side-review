package com.sideReview.side.controller

import com.sideReview.side.common.util.MapperUtil
import com.sideReview.side.person.PersonService
import com.sideReview.side.person.dto.PersonDto
import kotlinx.coroutines.runBlocking
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/person")
class PersonController(val personService: PersonService) {

    @GetMapping("")
    fun get(@RequestParam id: String): ResponseEntity<Any> {
        var response: ResponseEntity<Any> = ResponseEntity(HttpStatus.BAD_REQUEST)

        runBlocking {
            response = ResponseEntity.ok(
                MapperUtil.parseToPersonDto(
                    personService.get(
                        id
                    )
                )
            )
        }
        return response
    }

}