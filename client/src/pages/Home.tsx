import { API_URL } from '../config';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import ArticleCard from '../components/BlogCard';
import ImageBanner from '../components/ImageBanner';
import Button from '../components/Button';
import ComponentSlides from '../components/ComponentSlides';

export default function Home() {
  document.title = 'Linus Tech Tips Store';
  const [home, setHome] = useState<Home>();
  const navigate = useNavigate();
  useEffect(() => {
    const path = API_URL + '/home';
    fetch(path)
      .then((res) => {
        if (res.ok) return res.json();
        navigate('/404');
      })
      .then(setHome)
      .catch(() => {
        navigate('/404');
      });
  }, [navigate]);
  if (!home) return <Loading />;
  const { banner, featured, bestseller, blogs } = home;
  return (
    <main className="mx-8">
      <ImageBanner banner={banner} />
      <div className="mt-14 lg:hidden">
        <div className="my-10 text-3xl md:text-[40px] font-bold tracking-wide text-fgTertiary text-center">
          CHECK OUT OUR FAVORITES
        </div>
        <ComponentSlides
          components={featured.map((productCard) => (
            <ProductCard
              key={productCard.path}
              productCard={productCard}
            />
          ))}
          size={'full'}
        />
      </div>
      <div className="mt-14 mx-14 hidden lg:flex">
        <div className="w-1/4">
          <div className="my-10 text-3xl font-bold tracking-wide text-fgTertiary">
            Check Out Our Favorites
          </div>
          <Button
            text="View All"
            onClick={() => navigate('/collections/top-sellers')}
          />
        </div>
        {featured.map((productCard) => (
          <div className="w-1/4 px-1 mb-10">
            <ProductCard
              key={productCard.path}
              productCard={productCard}
            />
          </div>
        ))}
      </div>
      <div className="mx-14 flex-wrap hidden lg:flex">
        <div className="my-10 w-full">
          <div className="w-max mx-auto text-4xl font-bold tracking-wide text-fgTertiary">
            BEST SELLERS
          </div>
        </div>
        {bestseller.map((productCard) => (
          <div className="w-1/3 px-1 mb-10">
            <ProductCard
              key={productCard.path}
              productCard={productCard}
            />
          </div>
        ))}
        <div className="mb-10 w-full">
          <div className="w-max mx-auto">
            <Button
              text="View All"
              onClick={() => navigate('/collections/all-products')}
            />
          </div>
        </div>
      </div>
      <div className="mt-14 lg:hidden">
        <div className="my-10 text-3xl md:text-[40px] font-bold tracking-wide text-fgTertiary text-center">
          The Newsletter Archive
        </div>
        <ComponentSlides
          components={blogs.map((blogCard) => (
            <ArticleCard
              key={blogCard.path}
              blogCard={blogCard}
            />
          ))}
          size={'half'}
        />
      </div>
      <div className="mx-14 flex-wrap hidden lg:flex">
        <div className="my-10 w-full">
          <div className="w-max mx-auto text-4xl font-bold tracking-wide text-fgTertiary">
            The Newsletter Archive
          </div>
        </div>
        {blogs.map((blogCard) => (
          <div className="w-1/3 px-1 mb-10">
            <ArticleCard
              key={blogCard.path}
              blogCard={blogCard}
            />
          </div>
        ))}
        <div className=" mb-10 w-full">
          <div className="w-max mx-auto">
            <Button
              text="View All"
              onClick={() => navigate('/blogs/the-newsletter-archive')}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
