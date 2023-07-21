import ProductCard from './ProductCard';

type ProductDetailBoxRelatedProductsProps = {
  detail: string[];
};

export default function ProductDetailBoxRelatedProducts({
  detail,
}: ProductDetailBoxRelatedProductsProps) {
  return (
    <div className="pt-3 flex gap-5 overflow-auto">
      {detail.map((productPath) => (
        <div
          key={productPath}
          className="flex-none w-[80%]">
          <ProductCard productPath={productPath} />
        </div>
      ))}
    </div>
  );
}
