import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ProductDetailBoxTable from './ProductDetailBoxTable';

type ProductDetailProps = {
  title: string;
  detail: string | string[][];
};

export default function ProductDetailBox({
  title,
  detail,
}: ProductDetailProps) {
  const [displayDetails, setDisplayDetails] = useState(false);
  return (
    <div
      className={`my-2.5 border rounded py-3 px-7 hover:shadow-[inset_0_0_0_3px_rgb(227,227,227)] ${
        displayDetails && 'shadow-[inset_0_0_0_2px_rgb(227,227,227)]'
      } transition duration-300 bg-fgSecondary`}
      onClick={() => setDisplayDetails((prev) => !prev)}>
      <div className="rounded flex justify-between">
        <div className="text-xl font-extrabold">{title}</div>
        <button
          className={`${
            displayDetails && 'rotate-90'
          } hover:scale-[1.15] transition`}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className={`${!displayDetails && 'hidden'} `}>
        {Array.isArray(detail) ? (
          <ProductDetailBoxTable detail={detail} />
        ) : (
          detail.split('\n').map((line, idx) => (
            <p
              key={idx}
              className="py-2 text-fgTertiary">
              {line}
            </p>
          ))
        )}
      </div>
    </div>
  );
}
