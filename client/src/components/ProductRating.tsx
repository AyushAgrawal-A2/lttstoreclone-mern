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
  return (
    <div>
      {Array(full)
        .fill(0)
        .map(() => (
          <FontAwesomeIcon icon={faStar} />
        ))}
      {Array(half)
        .fill(0)
        .map(() => (
          <FontAwesomeIcon icon={faStarHalfStroke} />
        ))}
      {Array(empty)
        .fill(0)
        .map(() => (
          <FontAwesomeIcon icon={faEmpty} />
        ))}
      <span className="my-1 font-semibold  text-fgTertiary">{rating.text}</span>
    </div>
  );
}
