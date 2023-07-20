type Products = {
  [path: string]: Product;
};

type Product = {
  title: string;
  path: string;
  inStock: boolean;
  productId?: string;
  rating?: Rating;
  price: string;
  images: Image[];
  details: {
    [key: string]: string | string[][];
  };
  colorSwatch?: ColorSwatch;
  sizeOptions: SizeOption[];
  featureImages: string[];
  reviews?: Review[];
};

type Rating = {
  stars: string;
  text: string;
};

type Image = {
  src: string;
  overlay?: string;
};

type ColorSwatch = {
  [color: string]: {
    imgPosition: number;
    backgroundColor?: string;
    backgroundImage?: string;
  };
};

type SizeOption = {
  name: string;
  symbol: string;
};

type Review = {
  author: string;
  verified: boolean;
  time: string;
  stars: number;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
};
