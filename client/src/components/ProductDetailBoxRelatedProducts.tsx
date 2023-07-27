import ProductCard from './ProductCard';

type ProductDetailBoxRelatedProductsProps = {
  detail: string[];
  productCards: ProductCard[];
};

export default function ProductDetailBoxRelatedProducts({
  detail,
  productCards,
}: ProductDetailBoxRelatedProductsProps) {
  return (
    <div className="pt-3 flex gap-5 overflow-auto">
      {detail.map((productPath) => {
        const productCard = productCards.find(
          (productCard) => productCard.path === productPath
        );
        if (!productCard) return <></>;
        return (
          <div
            key={productPath}
            className="flex-none w-[80%]">
            <ProductCard productCard={productCard} />
          </div>
        );
      })}
    </div>
  );
}
