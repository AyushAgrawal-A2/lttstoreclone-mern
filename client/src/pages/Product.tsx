import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails';
import ProductImages from '../components/ProductImages';
import ProductImagesModal from '../components/ProductImagesModal';
import ProductImagesPreview from '../components/ProductImagesPreview';

const product = {
  title: 'The JerryRig Razor Knife',
  reviews: [
    {
      stars: 5,
      date: '05/19/2023',
      name: 'Jason Roberts',
      heading: 'Great build quality and design',
      description:
        "I had been close to ordering this a few times before it became available on the LTT Store. Finally bought one after my current (at the time) cheap alternative started to have issues. The build quality of this is great and I love the design (went for the Metal colour option). I feel like I won't need to replace this for quite a few years at least.",
    },
  ],
  price: '$14.95 USD',
  colors: [
    { name: 'orange', backgroundColor: '', image: '' },
    {
      name: 'neon pink',
      backgroundColor: 'orange',
      image:
        'cdn.shopify.com/s/files/1/0058/4538/5314/files/neon-pink_64x64.png',
    },
  ],
  inStock: true,
  productDetails: {
    'Size Guide': '4.1" closed',
    'Product Information':
      "Made using an Aluminum-Zinc alloy, the JerryRig Knife uses premium materials to ensure it's the perfect weight and size for both your pockets and your hands. The all metal handle is textured with a tessellated hexagon pattern that gives you a confident grip, and the built-in JerryRigEverything belt clip serves as your constant reminder that Life is a DIY project.\nThe CLEAR knife is made from Polycarbonate, the same stuff they put inside bullet proof glass.",
    Description:
      "From https://jerryrigknife.com/\nMade using an Aluminum-Zinc alloy, The JerryRig Knife uses premium materials to ensure it's the perfect weight and size for both your pockets and your hands. The all metal handle is textured with a tessellated hexagon pattern that gives you a confident grip, and the built-in JerryRigEverything belt clip serves as your constant reminder that Life is a DIY project.\nThe CLEAR knife is made from Polycarbonate, the same stuff they put inside bullet proof glass.\nOf course, even the sharpest blade will eventually become dull. When it comes time to replace the razor blade, you've got nothing to worry about. No proprietary sharp edges here - The JerryRig Knife uses standard stainless steel replacement blades that can be found at any hardware store for pennies, and will swap out in seconds.\nWhether you're buying one for yourself or for a friend, make sure the owner can be trusted around sharp objects. Remember: The JerryRig Knife doesn't cost an arm and a leg... but it might cost you a finger if you aren't careful.",
  },
  productImages: [
    'https://cdn.shopify.com/s/files/1/0058/4538/5314/files/lttstore_JerryRigEverythingKnives_BlackandOrange_TransparencyFile.png',
    'https://cdn.shopify.com/s/files/1/0058/4538/5314/files/orange2.jpg',
    'https://cdn.shopify.com/s/files/1/0058/4538/5314/files/orange.jpg',
    'https://cdn.shopify.com/s/files/1/0058/4538/5314/files/black2.jpg',
    'https://cdn.shopify.com/s/files/1/0058/4538/5314/files/black.jpg',
    'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/lttstore_GREKnife_TransparencyFile.png',
    'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/JerryRigEveythingKnife2000PX-8.jpg',
    'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/JerryRigEveythingKnife2000PX-2.jpg',
    'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/JerryRigEveythingKnife2000PX-3.jpg',
    'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/JerryRigEveythingKnife2000PX-6.jpg',
    'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/JerryRigEveythingKnife2000PX-1.jpg',
    'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/JerryRigEveythingKnife2000PX-5.jpg',
    'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/JerryRigEveythingKnife2000PX-4.jpg',
  ],
};

export default function Product() {
  const productName = useParams().product;
  console.log(productName);
  document.title = product.title + ' - Linus Tech Tips Store';

  const [displayModal, setDisplayModal] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);

  function imageScroll(idx: number) {
    document.getElementById(`image${idx}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }

  function imageModal(idx: number) {
    setDisplayModal(true);
    setModalIdx(idx);
  }

  return (
    <main className="mx-8">
      {displayModal && (
        <ProductImagesModal
          title={product.title}
          productImages={product.productImages}
          displayModal={displayModal}
          modalIdx={modalIdx}
          setDisplayModal={setDisplayModal}
        />
      )}
      <div className="max-w-[1800px] mx-auto py-9 px-12 flex gap-10">
        <div className="basis-[55%] flex flex-row-reverse gap-3.5 overscroll-contain">
          <ProductImages
            productImages={product.productImages}
            imageModal={imageModal}
          />
          <ProductImagesPreview
            productImages={product.productImages}
            imageScroll={imageScroll}
          />
        </div>
        <div className="basis-[45%]">
          <div className="text-4xl break-words font-sans font-bold tracking-[.0165em] leading-[3rem] uppercase">
            {product.title}
          </div>
          <ProductDetails productDetails={product.productDetails} />
        </div>
      </div>
    </main>
  );
}
