import { API_URL } from '../config';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductColorSwatch from './ProductColorSwatch';
import Loading from './Loading';

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
        .then(setCurrentProduct)
        .catch(() => {
          navigate('/404');
        });
    }
  }, [product, productPath, navigate]);

  if (!currentProduct) return <Loading />;

  return (
    <div className="group">
      <div className="relative">
        <img
          className="rounded-2xl bg-bgTertiary cursor-pointer aspect-square object-cover group-hover:scale-105"
          src={currentProduct.images[imgPos].src}
          onClick={() => navigate(currentProduct.path)}
          loading="lazy"
        />
        <div
          className={`absolute bottom-0 left-0 m-4 py-1 px-2 bg-white text-black text-xs border border-black rounded-full ${
            currentProduct.inStock && 'hidden'
          }`}>
          Sold Out
        </div>
      </div>
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
