import Link from 'next/link';
import Header from '../components/Header';

// change name of function later
const mockProducts = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' },
  { id: 4, name: 'Product 4' },
];

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-6">
      <Header />
      <div className="product-list">
        {mockProducts.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            data-test-id={`product-${product.id}`}
          >
            <div className="product-card">
              <h2>{product.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
