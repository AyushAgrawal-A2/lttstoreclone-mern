import {
  faStar as faEmpty,
  faStarHalfStroke,
} from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ProductRatingProps = {
  rating: Rating;
};

export default function ProductRating({ rating }: ProductRatingProps) {
  const star = Math.round(parseFloat(rating.stars) * 2);
  const full = Math.floor(star / 2);
  const half = star - 2 * full;
  const empty = 5 - full - half;

  function handleClick() {
    document.getElementById('customerReviews')?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }

  return (
    <div
      className="py-1 hover:cursor-pointer"
      onClick={handleClick}>
      {Array(full)
        .fill(0)
        .map((_, idx) => (
          <FontAwesomeIcon
            key={`full${idx}`}
            icon={faStar}
            style={{
              color: '#fa4d09',
            }}
          />
        ))}
      {Array(half)
        .fill(0)
        .map((_, idx) => (
          <FontAwesomeIcon
            key={`half${idx}`}
            icon={faStarHalfStroke}
            style={{
              color: '#fa4d09',
            }}
          />
        ))}
      {Array(empty)
        .fill(0)
        .map((_, idx) => (
          <FontAwesomeIcon
            key={`empty${idx}`}
            icon={faEmpty}
            style={{
              color: '#fa4d09',
            }}
          />
        ))}
      <span className="my-1 font-semibold text-fgTertiary pl-1">
        {rating.text}
      </span>
    </div>
  );
}
