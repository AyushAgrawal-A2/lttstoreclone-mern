import ProductDetailBox from './ProductDetailBox';

type ProductDetailsProps = {
  details: {
    [key: string]: string | string[][];
  };
};

export default function ProductDetails({ details }: ProductDetailsProps) {
  return Object.entries(details).map(([title, detail]) => (
    <ProductDetailBox
      key={title}
      title={title}
      detail={detail}
    />
  ));
}
