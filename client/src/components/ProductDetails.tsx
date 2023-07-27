import ProductDetailBox from './ProductDetailBox';

type ProductDetailsProps = {
  details: {
    [key: string]: Detail;
  };
  productCards: ProductCard[];
};

export default function ProductDetails({
  details,
  productCards,
}: ProductDetailsProps) {
  return Object.entries(details).map(([title, detail]) => (
    <ProductDetailBox
      key={title}
      title={title}
      detail={detail}
      productCards={productCards}
    />
  ));
}
