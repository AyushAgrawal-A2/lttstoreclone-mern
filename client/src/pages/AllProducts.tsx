const API_URL = import.meta.env.VITE_REACT_APP_SERVER_API_URL;
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

export default function AllProducts() {
  document.title = 'All Products - Linus Tech Tips Store';

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

  console.log(products);

  return (
    <main className="mx-8">
      <div className="max-w-[1800px] mx-auto py-9 px-12 flex flex-wrap gap-10">
        {Object.keys(products).map((productPath) => (
          <ProductCard
            key={productPath}
            product={products[productPath]}
          />
        ))}
      </div>
    </main>
  );
}
