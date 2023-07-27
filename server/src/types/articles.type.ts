interface Article {
  path: string;
  heading: string;
  cardText: string;
  date: string;
  imgURL: string;
  contents: Content[];
}

interface ArticleCard {
  path: string;
  heading: string;
  cardText: string;
  date: string;
  imgURL: string;
}

interface Content {
  type: 'text' | 'image';
  data: string;
}