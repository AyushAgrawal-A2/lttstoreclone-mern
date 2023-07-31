import { API_URL } from '../config';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

export default function Collections() {
  const category = useParams().category ?? 'all';
  const [curCategory, setCurCategory] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [productCards, setProductCards] = useState<ProductCard[]>([]);
  const navigate = useNavigate();

  document.title = category + ' - Linus Tech Tips Store';

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    function handleScroll() {
      if (
        !loading &&
        !allLoaded &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight
      ) {
        setPage((prev) => prev + 1);
        setLoading(true);
      }
    }
    if (category !== curCategory) {
      setCurCategory(category);
      setPage(1);
      setLoading(true);
      setAllLoaded(false);
      setProductCards([]);
    } else if (loading && !allLoaded) {
      const path = API_URL + '/collections/' + category;
      const url = new URL(path);
      url.searchParams.set('page', page.toString());
      url.searchParams.set('perPage', '12');
      fetch(url)
        .then((res) => {
          if (res.ok) return res.json();
          navigate('/404');
        })
        .then(({ productCards }) => {
          if (productCards.length < 12) setAllLoaded(true);
          setProductCards((prev) => [
            ...prev.slice(0, 12 * (page - 1)),
            ...productCards,
          ]);
          setLoading(false);
        })
        .catch(() => {
          navigate('/404');
        });
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [category, curCategory, page, loading, allLoaded, navigate]);

  return (
    <main className="mx-8">
      <div className="max-w-[1800px] mx-auto py-9 px-12">
        <div className="flex flex-wrap">
          {productCards.map((productCard) => (
            <div
              key={productCard.path}
              className="w-1/2 lg:w-1/3 p-2">
              <ProductCard productCard={productCard} />
            </div>
          ))}
        </div>
        {loading && <Loading />}
      </div>
    </main>
  );
}
