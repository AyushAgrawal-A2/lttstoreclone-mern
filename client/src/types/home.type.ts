interface Home {
  banner: Banner[];
  featured: string[];
  bestseller: string[];
  articles: string[];
}

interface Banner {
  link: string;
  imgURL: string;
}
