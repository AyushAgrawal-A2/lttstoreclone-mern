const API_URL =
  process.env.SERVER_API_URL ?? import.meta.env.VITE_SERVER_API_URL;

import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useParams, useNavigate } from 'react-router-dom';

export default function Collections() {
  const category = useParams().category ?? 'All Products';
  document.title = category + ' - Linus Tech Tips Store';
  const path = API_URL + '/products';
  const [products, setProducts] = useState<Products>();
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
      <div className="max-w-[1800px] mx-auto py-9 px-12">
        <div className="flex flex-wrap">
          {Object.keys(products).map((productPath) => (
            <div
              key={productPath}
              className="w-1/2 lg:w-1/3 p-2">
              <ProductCard product={products[productPath]} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
