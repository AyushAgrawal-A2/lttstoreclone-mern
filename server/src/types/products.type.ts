interface Product {
  title: string;
  path: string;
  inStock: boolean;
  price: string;
  productId: string;
  images: Image[];
  details: {
    [detail: string]: Detail;
  };
  sizeOptions: SizeOption[];
  featureImages: string[];
  collections: string[];
  ranks: {
    [criteria: string]: number;
  };
  rating: Rating;
  reviewStats: ReviewStats;
  colorSwatch?: ColorSwatch;
  type?: string;
  gender?: string;
}

interface ProductCard {
  title: string;
  path: string;
  inStock: boolean;
  price: string;
  images: Image[];
  colorSwatch?: ColorSwatch;
  
}

interface Rating {
  [rating: string]: string;
}

interface ReviewStats {
  [rating: string]: number;
}

interface Image {
  src: string;
  overlay?: string;
}

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

interface SizeOption {
  name: string;
  symbol: string;
}

interface ColorSwatch {
  [color: string]: {
    imgPosition: number;
    backgroundColor?: string;
    backgroundImage?: string;
  };
}
