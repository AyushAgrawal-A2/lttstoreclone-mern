import ProductRating from './ProductRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

interface ProductReviewProps {
  review: Review;
}

export default function ProductReview({ review }: ProductReviewProps) {
  const { author, body, dislikes, likes, stars, time, title, verified } =
    review;
  return (
    <div key={time}>
      <hr className="py-1" />
      <div className="flex items-center gap-2">
        <div className="bg-[#e9e9e9] text-black rounded-full w-12 h-12 flex justify-center items-center">
          {author[0]}
        </div>
        <div>
          <div className="flex items-center">
            <ProductRating rating={{ stars, text: '' }} />
            <div className="font-semibold">{time}</div>
          </div>
          <div className="flex items-center">
            <div className="text-xs mr-1 px-1 text-white bg-LTTOrange font-semibold">
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
  );
}
