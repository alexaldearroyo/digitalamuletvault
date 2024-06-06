import Link from 'next/link';

const mockProducts = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' },
  { id: 4, name: 'Product 4' },
];

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">The Digital Amulet Vault</h1>
        <Link href="/products" data-test-id="products-link">
          <span className="text-blue-500 hover:underline">Products Page</span>
        </Link>
      </header>
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
