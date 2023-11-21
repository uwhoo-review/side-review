/*export const PLATFORM = {
  NETFLIX: {
    id: 8,
    name: "Netflix",
  },
  DISNEY_PLUS: {
    id: 337,
    name: "Disney+",
  },
  APPLE_TV: {
    id: 350,
    name: "Apple TV",
  },
  WAVVE: {
    id: 356,
    name: "Wavve",
  },
  WHATCHA: {
    id: 97,
    name: "Whatcha",
  },
} as const;*/

export const PLATFORM_ID = {
  NETFLIX: 8,
  DISNEY_PLUS: 337,
  APPLE_TV: 350,
  WAVVE: 356,
  WHATCHA: 97,
};

export const PLATFORM_NAME = {
  [PLATFORM_ID.NETFLIX]: "Netflix",
  [PLATFORM_ID.DISNEY_PLUS]: "Disney",
  [PLATFORM_ID.APPLE_TV]: "Apple TV",
  [PLATFORM_ID.WAVVE]: "Wavve",
  [PLATFORM_ID.WHATCHA]: "Whatcha",
} as const;

export const WATCH_RATING = {
  ALL: "전체관람가",
  TWELVE: "12",
  FIFTEEN: "15",
  NINETEEN: "19+",
} as const;

export const GENRE_ID = {
  ACTION_ADVENTURE: 10759,
  COMEDY: 35,
  ANIMATION: 16,
  CRIME: 80,
  DOCUMENTARY: 99,
  DRAMA: 18,
  FAMILY: 10751,
  KIDS: 10762,
  MYSTERY: 9648,
  NEWS: 10763,
  REALITY: 10764,
  SF: 10765,
  SOAP: 10766,
  TALK: 10767,
  WAR_POLITICS: 10768,
  WESTERN: 37,
};

export const GENRE_NAME = {
  [GENRE_ID.ACTION_ADVENTURE]: "액션 & 어드벤쳐",
  [GENRE_ID.COMEDY]: "코미디",
  [GENRE_ID.ANIMATION]: "애니메이션",
  [GENRE_ID.CRIME]: "범죄",
  [GENRE_ID.DOCUMENTARY]: "다큐멘터리",
  [GENRE_ID.DRAMA]: "드라마",
  [GENRE_ID.FAMILY]: "가족",
  [GENRE_ID.KIDS]: "키즈",
  [GENRE_ID.MYSTERY]: "미스테리",
  [GENRE_ID.NEWS]: "뉴스",
  [GENRE_ID.REALITY]: "리얼리티",
  [GENRE_ID.SF]: "SF, 판타지",
  [GENRE_ID.SOAP]: "드라마",
  [GENRE_ID.TALK]: "토크",
  [GENRE_ID.WAR_POLITICS]: "전쟁, 정치",
  [GENRE_ID.WESTERN]: "서부",
} as const;

export const FILTER_SORT = {
  FAVORITE_SORT: "인기 순",
  RECENTLY: "최신 공개 순",
  RATING_SORT: "제목 순",
  NAME_SORT: "별점 순",
};

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
