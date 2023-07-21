const API_URL =
  process.env.SERVER_API_URL ?? import.meta.env.VITE_SERVER_API_URL;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductRating from './ProductRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
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
    fetch(url.toString())
      .then((res) => {
        if (res.ok) return res.json();
        navigate('/404');
      })
      .then(setReviewsResponse);
  }, [productId, page, navigate]);
  setPage;
  return (
    <div>
      {reviewsResponse && reviewsResponse.reviews && (
        <>
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
                <ProductRating rating={{ stars, text: '' }} />
                <div>{time}</div>
                <div>{verified && 'Verified'}</div>
                <div>{author}</div>
                <div>{title}</div>
                <div>{body}</div>
                <div>{dislikes}</div>
                <div>{likes}</div>
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
                if (num < 1 || num > totalPages) return <></>;
                return (
                  <span
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
        </>
      )}
    </div>
  );
}
