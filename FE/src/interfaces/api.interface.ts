import { WATCH_RATING_ID } from "@src/variables/CommonConstants";

export interface ContentDO {
  id: string;
  name: string;
  platform: number[];
  genre: number[];
  date: string;
  synopsis?: string;
  trailer?: string;
  poster?: string;
  rating: RatingDO;
  age?: (typeof WATCH_RATING_ID)[keyof typeof WATCH_RATING_ID];
  actors?: string[];
  season?: SeasonDO;
  review?: ReviewDO;
}

export interface ReviewDO {
  review: string[];
  total: number;
}

export interface SeasonDO {
  list: {
    id: string;
    name: string;
  };
  now: number;
}

export interface RatingDO {
  rating?: number;
  total: number;
  user?: number;
}

export interface ContentsResDO {
  latest: ContentDO[];
  popular: ContentDO[];
  favorite: {
    latest: string[];
    popular: string[];
  };
}
