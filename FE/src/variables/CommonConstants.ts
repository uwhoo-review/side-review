export const PLATFORM = {
  NETFLIX: "Netflix",
  DISNEY_PLUS: "Disney+",
  APPLE_TV: "Apple TV",
} as const;

export const WATCH_RATING = {
  ALL: "전체관람가",
  TWELVE: "12세",
  FIFTEEN: "15세",
  NINETEEN: "19+",
} as const;

export const GENRE = {
  ACTION_ADVENTURE: "액션 & 어드벤쳐",
  COMEDY: "코미디",
  ANIMATION: "애니메이션",
  CRIME: "",
  DOCUMENTARY: "",
  DRAMA: "",
  FAMILY: "",
  KIDS: "",
  MYSTERY: "",
  NEWS: "",
  REALITY: "",
  SCRFI_FANTASY: "",
  SOAP: "",
  TALK: "",
  WAR_POLITICS: "",
  WESTERN: "",
} as const;

export const FILTER_SORT = {
  FAVORITE_SORT: "인기 순",
  RECENTLY: "최신 공개 순",
  RATING_SORT: "제목 순",
  NAME_SORT: "별점 순"
}

export const DUMMY_CONTENT = {
  actors: "김지훈, 나나나, 가가가",
  age: 19,
  genre: ["드라마", "액션, 어드벤쳐", "SF, 판타지", "미스터리"],
  id: 135238,
  name: "경성크리처",
  platform: ["netflix"],
  poster: "/kkDpdo3zZJtKYKpF25VQM17ZOWM.jpg",
  rating: 3.5,
  synopsis:
    "쓸쓸한 어둠이 드리웠던 비극의 시대, 1945년 봄. 생존이 전부였던 두 청춘이 인간의 탐욕으로 탄생한 괴물들과 사투를 벌인다.",
  trailer: "EtaV2rM80D8",
  year: "2023",
};
