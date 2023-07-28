interface Blog {
  path: string;
  heading: string;
  cardText: string;
  date: string;
  imgURL: string;
  contents: Content[];
}

interface BlogCard {
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
