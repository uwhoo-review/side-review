export interface createReviewAPI {
  reviewId?: string;
  dramaId: string;
  content: string;
  spoiler: boolean;
}

export interface updownReviewAPI {
  reviewId: string;
  eval: boolean;
}
