import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

type ProductDetailProps = {
  title: string;
  detail: string;
};

export default function ProductDetailBox({
  title,
  detail,
}: ProductDetailProps) {
  const [displayDetails, setDisplayDetails] = useState(false);
  return (
    <div
      className={`my-2.5 border rounded py-4 px-8 hover:shadow-[inset_0_0_0_3px_rgb(227,227,227)] ${
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
      <div className={`${!displayDetails && 'hidden'} whitespace-pre-line`}>
        {detail.split('\n').map((line) => (
          <p className="py-2 text-fgTertiary">{line}</p>
        ))}
      </div>
    </div>
  );
}
