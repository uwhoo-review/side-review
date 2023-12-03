export interface createReviewAPI {
  dramaId: string;
  content: string;
  spoiler: boolean;
}

export interface updownReviewAPI {
  reviewId: string;
  eval: boolean;
}
