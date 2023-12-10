export interface ContentDO {
  genre: number[];
  id: string;
  name: string;
  platform: string[];
  poster: string;
  rating: number;
  review: ReviewDO;
  synopsis: string;
  trailer: string;
  year: string;
  age: number;
  actors: string[];
}

export interface ReviewDO {
  review: string[];
  total: number;
}

export interface ContentsResDO {
  latest: ContentDO[];
  popular: ContentDO[];
}

