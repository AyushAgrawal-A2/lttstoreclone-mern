const API_URL = import.meta.env.VITE_REACT_APP_SERVER_API_URL;
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

export default function AllProducts() {
  document.title = 'All Products - Linus Tech Tips Store';

  const path = API_URL + '/products';
  const [products, setProducts] = useState<string[]>();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(path)
      .then((res) => {
        if (res.ok) return res.json();
        navigate('/404');
      })
      .then(setProducts);
  }, [path, navigate]);

  if (!products) return <div>{path}</div>;

  return (
    <main className="mx-8">
      <div className="max-w-[1800px] mx-auto py-9 px-12 flex flex-wrap gap-10">
        {products.map((productPath) => (
          <ProductCard
            key={productPath}
            productPath={productPath}
          />
        ))}
      </div>
    </main>
  );
}
