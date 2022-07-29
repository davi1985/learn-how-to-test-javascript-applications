import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchProducs = () => {
  const [products, setProduct] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    axios
      .get('/api/products')
      .then((res) => mounted && setProduct(res.data.products))
      .catch((err) => mounted && setError(true));

    return () => (mounted = false);
  }, []);

  return {
    products,
    error,
  };
};
