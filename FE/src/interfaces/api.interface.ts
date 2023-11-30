export interface ContentProps {
  episodeCount: number;
  firstAirDate: Date;
  genre: number[];
  id: string;
  name: string;
  photo: string[];
  actors: string[];
  platform: string[];
  poster: string;
  age: number;
  rating: number;
  sortingName: string;
  synopsis: string;
  trailer: string[];
}

export interface ContentsDO {
  latest: ContentProps[];
  popular: ContentProps[];
}
