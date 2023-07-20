const API_URL = import.meta.env.VITE_REACT_APP_SERVER_API_URL;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type ProductCardProps = {
  productPath: string;
};

export default function ProductCard({ productPath }: ProductCardProps) {
  const path = API_URL + productPath;
  const [product, setProduct] = useState<Product>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(path)
      .then((res) => {
        if (res.ok) return res.json();
        navigate('/404');
      })
      .then(setProduct);
  }, [path, navigate]);
  return <div>{product?.title}</div>;
}
