import { API_URL } from '../config';
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
import ProductReviews from '../components/ProductReviews';
import Loading from '../components/Loading';
import ComponentSlides from '../components/ComponentSlides';
import ImageWithOverlay from '../components/ImageWithOverlay';
import ProductRecommendation from '../components/ProductRecommendation';

export default function Product() {
  const path = API_URL + '/products/' + useParams().product ?? '';
  const [product, setProduct] = useState<Product>();
  const [productCards, setProductCards] = useState<ProductCard[]>([]);
  const [productRecommendations, setProductRecommendations] = useState<
    ProductCard[]
  >([]);
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
      .then(({ product, productCards, recommendations }) => {
        setProduct(product);
        setProductCards(productCards);
        setProductRecommendations(recommendations);
      })
      .catch(() => {
        navigate('/404');
      });
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

  if (!product) return <Loading />;

  document.title = product.title + ' - Linus Tech Tips Store';

  return (
    <>
      <ProductImagesModal
        title={product.title}
        images={product.images}
        modalIdx={modalIdx}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
      />
      <main className="md:mx-8 py-9 px-12">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[50%] lg:w-[55%] self-start md:sticky top-0 md:pr-4">
            <div className="md:hidden">
              <ComponentSlides
                components={product.images.map((image, idx) => (
                  <li
                    key={idx}
                    className="snap-start relative group shrink-0 grow-0 w-[95%]">
                    <ImageWithOverlay
                      image={image}
                      idx={-idx - 1}
                      imageModal={imageModal}
                    />
                  </li>
                ))}
                slidesPerView={1}
                centeredSlides={false}
              />
            </div>
            <div className="hidden md:flex flex-col lg:flex-row-reverse gap-3.5 overscroll-contain">
              <ProductImages
                images={product.images}
                imageModal={imageModal}
              />
              <ProductImagesPreview
                images={product.images}
                imageScroll={imageScroll}
              />
            </div>
          </div>
          <div className="w-full md:w-[50%] lg:w-[45%] self-start md:sticky top-0 md:pl-4">
            <ProductTitle title={product.title} />
            {product.rating.text !== 'No reviews' && (
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
            <ProductDetails
              details={product.details}
              productCards={productCards}
            />
          </div>
        </div>
        <ProductFeatureImages featureImages={product.featureImages} />
        <ProductReviews
          reviewStats={product.reviewStats}
          productId={product.productId}
        />
        <ProductRecommendation productCards={productRecommendations} />
      </main>
    </>
  );
}
