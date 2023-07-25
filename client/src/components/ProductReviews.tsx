import { API_URL } from '../config';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import ProductReviewsHistogram from './ProductReviewsHistogram';
import ProductReview from './ProductReview';
import PageChanger from './PageChanger';

type ProductReviewsProps = {
  reviewStats: ReviewStats;
  productId: string;
};

export default function ProductReviews({
  reviewStats,
  productId,
}: ProductReviewsProps) {
  const [curProductId, setCurProductId] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [reviewStars, setReviewStars] = useState('');
  const [reviewsResponse, setReviewsResponse] = useState<ReviewResponse>();
  const navigate = useNavigate();
  const totalPages = Math.ceil((reviewsResponse?.total_count ?? 0) / 5);
  useEffect(() => {
    if (productId !== curProductId) {
      setCurProductId(productId);
      setLoading(true);
      setPage(1);
      setReviewStars('');
    }
    if (!loading) return;
    const url = new URL(API_URL + '/reviews');
    url.searchParams.set('productId', productId);
    url.searchParams.set('page', page.toString());
    url.searchParams.set('reviewStars', reviewStars);
    fetch(url)
      .then((res) => {
        if (res.ok) return res.json();
        navigate('/404');
      })
      .then((res) => {
        setLoading(false);
        setReviewsResponse(res);
      })
      .catch(() => {
        navigate('/404');
      });
  }, [productId, curProductId, loading, page, reviewStars, navigate]);

  function changePage(nextPage: number) {
    if (page === nextPage) return;
    setLoading(true);
    setPage(nextPage);
  }

  function changeReviewStars(stars: string) {
    if (reviewStars === stars) return;
    setLoading(true);
    setReviewStars(stars);
  }

  return (
    <>
      {reviewsResponse &&
        reviewsResponse.reviews &&
        reviewsResponse.reviews.length > 0 && (
          <div
            id="customerReviews"
            className="m-10">
            <ProductReviewsHistogram
              reviewStats={reviewStats}
              changeReviewStars={changeReviewStars}
            />
            <div className={`${loading && 'opacity-25'}`}>
              {reviewsResponse.reviews.map((review) => (
                <ProductReview
                  key={review.time}
                  review={review}
                />
              ))}
              <PageChanger
                page={page}
                totalPages={totalPages}
                changePage={changePage}
              />
            </div>
            <div className={`${!loading && 'hidden'}`}>
              <Loading />
            </div>
          </div>
        )}
    </>
  );
}
