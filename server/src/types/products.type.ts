type Products = {
  [path: string]: Product;
};

type Product = {
  title: string;
  path: string;
  inStock: boolean;
  productId: string;
  rating?: Rating;
  price: string;
  images: Image[];
  details: {
    [key: string]: Detail;
  };
  colorSwatch?: ColorSwatch;
  sizeOptions: SizeOption[];
  featureImages: string[];
};

type Rating = {
  stars: string;
  text: string;
};

type Image = {
  src: string;
  overlay?: string;
};

type Detail =
  | {
      type: 'text';
      data: string;
    }
  | {
      type: 'links';
      data: string[];
    }
  | {
      type: 'table';
      data: string[][];
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
