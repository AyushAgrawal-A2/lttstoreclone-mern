type ReviewResponse = {
  reviews: Review[];
  total_count: number;
};

type Review = {
  author: string;
  verified: boolean;
  time: string;
  stars: string;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
};
