import { API_URL } from '../config';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductRating from './ProductRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faThumbsUp,
  faThumbsDown,
} from '@fortawesome/free-solid-svg-icons';

type ProductReviewsProps = {
  productId: string;
};

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [page, setPage] = useState(1);
  const [reviewsResponse, setReviewsResponse] = useState<ReviewResponse>();
  const navigate = useNavigate();
  const totalPages = Math.ceil((reviewsResponse?.total_count ?? 0) / 5);
  useEffect(() => {
    const url = new URL(API_URL + '/reviews');
    url.searchParams.set('productId', productId);
    url.searchParams.set('page', page.toString());
    fetch(url)
      .then((res) => {
        if (res.ok) return res.json();
        navigate('/404');
      })
      .then(setReviewsResponse)
      .catch(() => {
        navigate('/404');
      });
  }, [productId, page, navigate]);
  return (
    <>
      {reviewsResponse && reviewsResponse.reviews && (
        <div className="my-10">
          {reviewsResponse.reviews.map(
            ({
              author,
              body,
              dislikes,
              likes,
              stars,
              time,
              title,
              verified,
            }) => (
              <div key={time}>
                <hr className="py-1" />
                <div className="flex items-center gap-2">
                  <div className="bg-[#e9e9e9] text-black rounded-full w-12 h-12 flex justify-center items-center">
                    {author[0]}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <ProductRating rating={{ stars, text: '' }} />
                      <div>{time}</div>
                    </div>
                    <div className="flex items-center">
                      <div
                        className="text-xs mr-1 px-1"
                        style={{
                          color: '#ffffff',
                          backgroundColor: '#fa4d09',
                        }}>
                        {verified && 'Verified'}
                      </div>
                      <div className="font-bold">{author}</div>
                    </div>
                  </div>
                </div>
                <div className="text-lg font-bold">{title}</div>
                <div className="font-semibold text-fgTertiary">{body}</div>
                <div className="my-2 flex items-center gap-2 justify-end">
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <div>{likes}</div>
                  <FontAwesomeIcon icon={faThumbsDown} />
                  <div>{dislikes}</div>
                </div>
              </div>
            )
          )}
          <div className="flex justify-center items-center">
            {page > 1 && (
              <FontAwesomeIcon
                icon={faAnglesLeft}
                className="px-2 cursor-pointer"
                onClick={() => setPage(1)}
              />
            )}
            {page > 1 && (
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="px-2 cursor-pointer"
                onClick={() => setPage((prev) => Math.max(0, prev - 1))}
              />
            )}
            {Array(5)
              .fill(0)
              .map((_, idx) => {
                const num = page + idx - 2;
                if (num < 1 || num > totalPages) return <span key={num}></span>;
                return (
                  <span
                    key={num}
                    className={`p-2 cursor-pointer ${
                      page === num && 'text-2xl font-bold'
                    }`}
                    onClick={() => setPage(num)}>
                    {num}
                  </span>
                );
              })}
            {page < totalPages && (
              <FontAwesomeIcon
                icon={faAngleRight}
                className="px-2 cursor-pointer"
                onClick={() =>
                  setPage((prev) => Math.min(totalPages, prev + 1))
                }
              />
            )}
            {page < totalPages && (
              <FontAwesomeIcon
                icon={faAnglesRight}
                className="px-2 cursor-pointer"
                onClick={() => setPage(totalPages)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
