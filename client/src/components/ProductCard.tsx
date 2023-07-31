import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductColorSwatch from './ProductColorSwatch';

type ProductCardProps = {
  productCard: ProductCard;
};

export default function ProductCard({ productCard }: ProductCardProps) {
  const [imgPos, setImgPos] = useState(0);
  const [colorIdx, setColorIdx] = useState(-1);
  const navigate = useNavigate();

  function changeColor(idx: number, imgPos: number) {
    setColorIdx(idx);
    setImgPos(imgPos);
  }

  return (
    <div className="group">
      <div className="relative rounded-2xl overflow-hidden">
        <img
          className="bg-bgTertiary cursor-pointer aspect-square object-cover group-hover:animate-grow"
          src={productCard.images[imgPos].src}
          onClick={() => navigate(productCard.path)}
        />
        <div
          className={`absolute bottom-0 left-0 m-4 py-1 px-2 bg-white text-black text-xs font-semibold border border-black rounded-full ${
            productCard.inStock && 'hidden'
          }`}>
          Sold Out
        </div>
      </div>
      {productCard.colorSwatch && (
        <ProductColorSwatch
          colorSwatch={productCard.colorSwatch}
          colorIdx={colorIdx}
          changeColor={changeColor}
          size={'sm'}
        />
      )}
      <div
        className="my-4 cursor-pointer"
        onClick={() => navigate(productCard.path)}>
        <div className="text-xl font-bold text-center hover:underline group-hover:underline">
          {productCard.title}
        </div>
        <div className="font-bold text-center">{productCard.price}</div>
      </div>
    </div>
  );
}
