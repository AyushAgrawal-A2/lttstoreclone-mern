import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ProductDetailBoxTable from './ProductDetailBoxTable';
import ProductDetailBoxRelatedProducts from './ProductDetailBoxRelatedProducts';

type ProductDetailProps = {
  title: string;
  detail: Detail;
  productCards: ProductCard[];
};

export default function ProductDetailBox({
  title,
  detail,
  productCards,
}: ProductDetailProps) {
  const [displayDetails, setDisplayDetails] = useState(
    title === 'Description' || title === 'Related Products'
  );
  return (
    <div
      className={`my-2.5 border rounded py-3 px-7 hover:shadow-[inset_0_0_0_3px_rgb(227,227,227)] ${
        displayDetails && 'shadow-[inset_0_0_0_2px_rgb(227,227,227)]'
      } transition duration-300 bg-fgSecondary`}>
      <div
        className="flex justify-between cursor-pointer py-2 bg-fgSecondary sticky top-0"
        onClick={() => setDisplayDetails((prev) => !prev)}>
        <div className="text-xl font-extrabold">{title}</div>
        <button
          className={`${
            displayDetails && 'rotate-90'
          } hover:scale-[1.15] transition`}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className={`${!displayDetails && 'hidden'} `}>
        {detail.type === 'text' ? (
          detail.data.split('\n').map((line, idx) => (
            <p
              key={idx}
              className="py-2 text-fgTertiary">
              {line}
            </p>
          ))
        ) : detail.type === 'table' ? (
          <ProductDetailBoxTable detail={detail.data} />
        ) : (
          <ProductDetailBoxRelatedProducts
            detail={detail.data}
            productCards={productCards}
          />
        )}
      </div>
    </div>
  );
}
