import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductColorSwatch from './ProductColorSwatch';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [imgPos, setImgPos] = useState(0);
  const [colorIdx, setColorIdx] = useState(-1);
  const navigate = useNavigate();

  function changeColor(idx: number, imgPos: number) {
    setColorIdx(idx);
    setImgPos(imgPos);
  }

  return (
    <div className="group/image">
      <img
        className="aspect-square object-cover rounded-2xl bg-bgTertiary cursor-pointer"
        src={product.images[imgPos].src}
        onClick={() => navigate(product.path)}
      />
      {product.colorSwatch && (
        <ProductColorSwatch
          colorSwatch={product.colorSwatch}
          colorIdx={colorIdx}
          changeColor={changeColor}
          size={'sm'}
        />
      )}
      <div
        className="my-4 cursor-pointer"
        onClick={() => navigate(product.path)}>
        <div className="text-xl font-medium text-center hover:underline group-hover/image:underline">
          {product.title}
        </div>
        <div className="font-bold text-center">{product.price}</div>
      </div>
    </div>
  );
}
