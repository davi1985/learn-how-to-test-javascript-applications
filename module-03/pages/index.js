import { useEffect, useState } from 'react';
import ProductCard from '../components/product-card';
import Search from '../components/search';
import { useFetchProducs } from '../hooks/use-fetch-products';

export default function Home() {
  const { products, error } = useFetchProducs();
  const [term, setTerm] = useState('');
  const [localProducts, setLocalProducts] = useState([]);

  useEffect(() => {
    if (!term) {
      setLocalProducts(products);
    } else {
      setLocalProducts(
        products.filter(({ title }) => {
          return title.toLowerCase().indexOf(term.toLocaleLowerCase()) > -1;
        }),
      );
    }
  }, [products, term]);

  const renderProductListOrMessage = () => {
    if (!localProducts.length && !error) {
      return <h4 data-testid="no-products">No products</h4>;
    }

    return localProducts.map((product) => (
      <ProductCard product={product} key={product.id} />
    ));
  };

  const renderErrorMessage = () => {
    if (!error) return null;

    return <h1 data-testid="server-error">Server is down</h1>;
  };

  const renderProductQuantity = () =>
    localProducts.length > 1 ? `${localProducts.length} Products` : '1 Product';

  return (
    <main className="my-8" data-testid="product-list">
      <Search
        doSearch={(term) => {
          setTerm(term);
        }}
      />

      <div className="container mx-auto px-6">
        <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>

        <span className="mt-3 text-sm text-gray-500">
          {renderProductQuantity()}
        </span>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {renderErrorMessage()}

          {renderProductListOrMessage()}
        </div>
      </div>
    </main>
  );
}
