interface Home {
  banner: Banner[];
  featured: ProductCard[];
  bestseller: ProductCard[];
  blogs: BlogCard[];
}

interface Banner {
  link: string;
  imgURL: string;
}
