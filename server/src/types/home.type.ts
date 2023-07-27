interface Home {
  banner: Banner[];
  featured: ProductCard[];
  bestseller: ProductCard[];
  articles: ArticleCard[];
}

interface Banner {
  link: string;
  imgURL: string;
}
