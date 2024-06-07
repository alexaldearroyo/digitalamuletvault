// src/app/products/[id]/page.js

import Link from 'next/link';

const mockProducts = [
  { id: 1, name: 'Product 1', description: 'Description for Product 1' },
  { id: 2, name: 'Product 2', description: 'Description for Product 2' },
  { id: 3, name: 'Product 3', description: 'Description for Product 3' },
  { id: 4, name: 'Product 4', description: 'Description for Product 4' },
];

export function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }) {
  const product = mockProducts.find(
    (product) => product.id.toString() === params.id,
  );

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <Link href="/">
          <span className="text-blue-500 hover:underline">Back to Home</span>
        </Link>
      </header>
      <div>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
