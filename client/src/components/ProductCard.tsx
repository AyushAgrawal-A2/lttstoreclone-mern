const API_URL =
  process.env.SERVER_API_URL ?? import.meta.env.VITE_SERVER_API_URL;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductColorSwatch from './ProductColorSwatch';

type ProductCardProps = {
  product?: Product;
  productPath?: string;
};

export default function ProductCard({
  product,
  productPath,
}: ProductCardProps) {
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [imgPos, setImgPos] = useState(0);
  const [colorIdx, setColorIdx] = useState(-1);
  const navigate = useNavigate();

  function changeColor(idx: number, imgPos: number) {
    setColorIdx(idx);
    setImgPos(imgPos);
  }

  useEffect(() => {
    if (product) {
      setCurrentProduct(product);
    } else if (productPath) {
      const path = API_URL + productPath;
      fetch(path)
        .then((res) => {
          if (res.ok) return res.json();
          navigate('/404');
        })
        .then(setCurrentProduct);
    }
  }, [product, productPath, navigate]);

  if (!currentProduct) return <div>{productPath}</div>;

  return (
    <div className="group">
      <img
        className="rounded-2xl bg-bgTertiary cursor-pointer aspect-square object-cover group-hover:scale-105"
        src={currentProduct.images[imgPos].src}
        onClick={() => navigate(currentProduct.path)}
      />
      {currentProduct.colorSwatch && (
        <ProductColorSwatch
          colorSwatch={currentProduct.colorSwatch}
          colorIdx={colorIdx}
          changeColor={changeColor}
          size={'sm'}
        />
      )}
      <div
        className="my-4 cursor-pointer"
        onClick={() => navigate(currentProduct.path)}>
        <div className="text-xl font-medium text-center hover:underline group-hover:underline">
          {currentProduct.title}
        </div>
        <div className="font-bold text-center">{currentProduct.price}</div>
      </div>
    </div>
  );
}
