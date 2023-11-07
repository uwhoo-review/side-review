export interface ContentProps {
  id: number;
  actors: string[];
  age: number;
  genre: number[];
  name: string;
  platform: string[];
  poster: string;
  rating: number;
  synopsis: string;
  trailer: string;
  year: string;
}

export interface ContentsDO {
  latest: ContentProps[];
  popular: ContentProps[];
}
