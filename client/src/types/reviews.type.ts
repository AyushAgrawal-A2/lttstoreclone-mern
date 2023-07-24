interface ReviewResponse {
  reviews: Review[];
  total_count: number;
}

interface Review {
  author: string;
  verified: boolean;
  time: string;
  stars: string;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
}
