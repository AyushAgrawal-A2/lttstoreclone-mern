import { API_URL } from '../config';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import ArticleCard from '../components/BlogCard';
import ImageBanner from '../components/ImageBanner';

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
      <div>
        {featured.map((productCard) => (
          <ProductCard
            key={productCard.path}
            productCard={productCard}
          />
        ))}
      </div>
      <div>
        {bestseller.map((productCard) => (
          <ProductCard
            key={productCard.path}
            productCard={productCard}
          />
        ))}
      </div>
      <div>
        {blogs.map((blogCard) => (
          <ArticleCard
            key={blogCard.path}
            blogCard={blogCard}
          />
        ))}
      </div>
    </main>
  );
}
