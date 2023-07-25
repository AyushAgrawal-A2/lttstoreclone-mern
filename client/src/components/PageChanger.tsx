import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';

interface PageChangerProps {
  page: number;
  totalPages: number;
  changePage: (nextPage: number) => void;
}

export default function PageChanger({
  page,
  totalPages,
  changePage,
}: PageChangerProps) {
  return (
    <div className="flex justify-center items-center">
      {page > 1 && (
        <FontAwesomeIcon
          icon={faAnglesLeft}
          className="px-2 cursor-pointer"
          onClick={() => changePage(1)}
        />
      )}
      {page > 1 && (
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="px-2 cursor-pointer"
          onClick={() => changePage(page - 1)}
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
              onClick={() => changePage(num)}>
              {num}
            </span>
          );
        })}
      {page < totalPages && (
        <FontAwesomeIcon
          icon={faAngleRight}
          className="px-2 cursor-pointer"
          onClick={() => changePage(page + 1)}
        />
      )}
      {page < totalPages && (
        <FontAwesomeIcon
          icon={faAnglesRight}
          className="px-2 cursor-pointer"
          onClick={() => changePage(totalPages)}
        />
      )}
    </div>
  );
}
