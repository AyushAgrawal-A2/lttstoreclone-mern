import ProductRating from './ProductRating';

interface ProductReviewsHistogramProps {
  reviewStats: ReviewStats;
  changeReviewStars: (stars: string) => void;
}

export default function ProductReviewsHistogram({
  reviewStats,
  changeReviewStars,
}: ProductReviewsHistogramProps) {
  const totalReviews = Object.keys(reviewStats).reduce(
    (sum, stars) => sum + reviewStats[stars],
    0
  );
  return (
    <div className="py-4">
      <div className="text-2xl font-semibold">Customer Reviews</div>
      <div className="flex">
        <div className="pr-4 border-r">
          <ProductRating rating={{ stars: '5', text: '' }} />
          <div className="text-fgTertiary">Based on {totalReviews} reviews</div>
        </div>
        <div className="px-4 border-r">
          {Object.keys(reviewStats)
            .map((key) => parseInt(key))
            .sort((a, b) => b - a)
            .map((num) => {
              const stars = num.toString();
              const percent = Math.round(
                (reviewStats[stars] / totalReviews) * 100
              );
              return (
                <div
                  key={stars}
                  onClick={() => changeReviewStars(stars)}
                  className="flex items-center text-sm hover:cursor-pointer hover:opacity-50">
                  <ProductRating rating={{ stars, text: '' }} />
                  <div className="h-[18px] w-[100px] m-1 border border-neutral-700">
                    <div
                      className={`h-full bg-gradient`}
                      style={{ width: `${percent}px` }}></div>
                  </div>
                  <div className="w-10 px-1">{percent}%</div>
                  <div>({reviewStats[stars]})</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
