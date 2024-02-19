package com.sideReview.side.openSearch.dto

data class ContentRequestDTO(
    var tab: String?,
    var sort: String?,
    val query: String?,
    var notQuery: List<String>?,
    var filter: MutableList<ContentRequestFilterDetail>?,
    var pagination: Int?
) {
    fun addFilter(filter: ContentRequestFilterDetail): ContentRequestDTO {
        if (this.filter == null)
            this.filter = mutableListOf()
        this.filter!!.add(filter)
        return this
    }
}

data class ContentRequestFilterDetail(
    // "filter": [
    //     // type 가능 값 : ["genre", "platform", "age", "date","rating"]
    //     //                                          > age는 아직 정보가 없어서 넣어도 효과 없음.
    //     // type이 genre, platform일 경우 value에 값 넣으면 됨.
    //     // and의 경우 동일 타입 여러개 사용
    //     {
    //         "type": "genre",
    //         "value": [
    //             "9648"
    //         ]
    //     },
    //     // or의 경우 value에 여러개
    //     {
    //         "type": "genre",
    //         "value": [
    //             "10759",
    //             "10765"
    //         ]
    //     },

    //     // type이 date, rating일 경우 value에 시작/종료 값.
    //     // value[0]번 이상, 1번 이하 검색.
    //     {
    //         "type": "date",
    //         "value": [
    //             "2021",
    //             "2023"
    //         ]
    //     },
    //     // 값은 반드시 2개. 절반 적용일 경우 한 쪽을 null로.
    //     //(예시1: 별점 3.5 이하 검색)
    //     {
    //         "type": "rating",
    //         "value": [
    //             null,
    //             "3.5"
    //         ]
    //     },
    //     //(예시2: 별점 1.0 이상 검색)
    //     {
    //         "type": "rating",
    //         "value": [
    //             "1.0",
    //             null
    //         ]
    //     }
    // ],
    val type: String,
    val value: List<String?>
)