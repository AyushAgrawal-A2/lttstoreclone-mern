const API_URL =
  process.env.SERVER_API_URL ?? import.meta.env.VITE_SERVER_API_URL;

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails';
import ProductImages from '../components/ProductImages';
import ProductImagesModal from '../components/ProductImagesModal';
import ProductImagesPreview from '../components/ProductImagesPreview';
import ProductColorSwatch from '../components/ProductColorSwatch';
import ProductSizeOptions from '../components/ProductSizeOptions';
import ProductPrice from '../components/ProductPrice';
import ProductTitle from '../components/ProductTitle';
import ProductRating from '../components/ProductRating';
import ProductFeatureImages from '../components/ProductFeatureImages';

export default function Product() {
  const path = API_URL + '/products/' + useParams().product ?? '';
  const [product, setProduct] = useState<Product>();
  const [colorIdx, setColorIdx] = useState(0);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(path)
      .then((res) => {
        if (res.ok) return res.json();
        navigate('/404');
      })
      .then(setProduct);
  }, [path, navigate]);

  function imageScroll(idx: number) {
    document.getElementById(`image${idx}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }

  function changeColor(idx: number, imgPos: number) {
    setColorIdx(idx);
    imageScroll(imgPos);
  }

  function imageModal(idx: number) {
    setDisplayModal(true);
    setModalIdx(idx);
  }

  if (!product) return <div>{path}</div>;

  document.title = product.title + ' - Linus Tech Tips Store';

  return (
    <main className="mx-8">
      {displayModal && (
        <ProductImagesModal
          title={product.title}
          images={product.images}
          displayModal={displayModal}
          modalIdx={modalIdx}
          setDisplayModal={setDisplayModal}
        />
      )}
      <div className="max-w-[1800px] mx-auto py-9 px-12 flex gap-10">
        <div className="basis-[55%] grow-0 shrink-0 flex flex-row-reverse gap-3.5 overscroll-contain">
          <ProductImages
            images={product.images}
            imageModal={imageModal}
          />
          <ProductImagesPreview
            images={product.images}
            imageScroll={imageScroll}
          />
        </div>
        <div className="basis-[45%]">
          <ProductTitle title={product.title} />
          {product.rating && product.rating.text !== 'No reviews' && (
            <ProductRating rating={product.rating} />
          )}
          <ProductPrice price={product.price} />
          {product.colorSwatch && (
            <ProductColorSwatch
              colorSwatch={product.colorSwatch}
              colorIdx={colorIdx}
              changeColor={changeColor}
              size={'lg'}
            />
          )}
          {product.sizeOptions.length > 0 && (
            <ProductSizeOptions
              sizeOptions={product.sizeOptions}
              sizeIdx={sizeIdx}
              setSizeIdx={setSizeIdx}
            />
          )}
          <ProductDetails details={product.details} />
        </div>
      </div>
      <ProductFeatureImages featureImages={product.featureImages} />
    </main>
  );
}
