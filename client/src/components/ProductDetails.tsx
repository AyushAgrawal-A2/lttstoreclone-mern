import ProductDetailBox from "./ProductDetailBox";

type ProductDetailsProps = {
  productDetails: {
    [key: string]: string;
  };
};

export default function ProductDetails({
  productDetails,
}: ProductDetailsProps) {
  return Object.entries(productDetails).map(([title, detail]) => (
    <ProductDetailBox
      title={title}
      detail={detail}
    />
  ));
}
