import { API_URL } from '../config';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

export default function Collections() {
  const category = useParams().category ?? 'all';
  const [prevCategory, setPrevCategory] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [allLoaded, setAllLoaded] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
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
    if (category !== prevCategory) {
      setPrevCategory(category);
      setPage(1);
      setLoading(true);
      setAllLoaded(false);
      setProducts([]);
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
        .then((res) => {
          if (res.length < 12) setAllLoaded(true);
          setProducts((prev) => [...prev.slice(0, 12 * (page - 1)), ...res]);
          setLoading(false);
        })
        .catch(() => {
          navigate('/404');
        });
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [category, prevCategory, page, loading, allLoaded, navigate]);

  if (!products) return <Loading />;

  return (
    <main className="mx-8">
      <div className="max-w-[1800px] mx-auto py-9 px-12">
        <div className="flex flex-wrap">
          {products.map((product) => (
            <div
              key={product.path}
              className="w-1/2 lg:w-1/3 p-2">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {loading && <Loading />}
      </div>
    </main>
  );
}
