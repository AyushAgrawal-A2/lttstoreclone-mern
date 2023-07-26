interface Article {
  path: string;
  heading: string;
  cardText: string;
  date: string;
  imgUrl: string;
  contents: Content[];
}

interface Content {
  type: 'text' | 'image';
  data: string;
}
