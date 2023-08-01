import ProductCard from './ProductCard';

interface ProductRecommendationProps {
  productCards: ProductCard[];
}

export default function ProductRecommendation({
  productCards,
}: ProductRecommendationProps) {
  return (
    <div>
      <div className="text-4xl font-semibold py-8 text-fgTertiary">
        CUSTOMERS ALSO LIKE
      </div>
      <div className="flex flex-wrap">
        {productCards.map((productCard) => (
          <div className="w-1/2 lg:w-1/4 pr-2">
            <ProductCard productCard={productCard} />
          </div>
        ))}
      </div>
    </div>
  );
}
