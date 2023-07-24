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
  collection?: string;
  collectionType?: string;
  gender?: string;
  ranks: {
    [criteria: string]: number;
  };
  rating?: Rating;
  colorSwatch?: ColorSwatch;
}

interface Rating {
  stars: string;
  text: string;
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
