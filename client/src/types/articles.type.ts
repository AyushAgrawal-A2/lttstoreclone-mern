interface Article {
  path: string;
  heading: string;
  cardText: string;
  date: string;
  imgURL: string;
  contents: Content[];
}

interface Content {
  type: 'text' | 'image';
  data: string;
}
