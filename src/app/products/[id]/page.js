// src/app/products/[id]/page.js

import Link from 'next/link';
import Header from '../../../components/Header';
import AddToCartButton from '../../../components/AddToCartButton';
import ShaderImage1 from '../../../components/ShaderImage1';
import ShaderImage2 from '../../../components/ShaderImage2';
import ShaderImage3 from '../../../components/ShaderImage3';
import ShaderImage4 from '../../../components/ShaderImage4';

const mockProducts = [
  {
    id: 1,
    name: 'Smooth Amulet',
    description: 'Description for Product 1',
    image: '/images/product1.jpg',
    price: 10.99,
  },
  {
    id: 2,
    name: 'Deep Amulet',
    description: 'Description for Product 2',
    image: '/images/product2.jpg',
    price: 20.99,
  },
  {
    id: 3,
    name: 'Fractal Amulet',
    description: 'Description for Product 3',
    image: '/images/product3.jpg',
    price: 30.99,
  },
  {
    id: 4,
    name: 'Spherical Amulet',
    description: 'Description for Product 4',
    image: '/images/product4.jpg',
    price: 40.99,
  },
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
      <Header />
      <div className="product-detail">
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
        {product.id === 1 ? (
          <div className="rounded-lg overflow-hidden mb-4">
            <ShaderImage1 width={300} height={300} />
          </div>
        ) : product.id === 2 ? (
          <div className="rounded-lg overflow-hidden mb-4">
            <ShaderImage2 width={300} height={300} />
          </div>
        ) : product.id === 3 ? (
          <div className="rounded-lg overflow-hidden mb-4">
            <ShaderImage3 width={300} height={300} />
          </div>
        ) : product.id === 4 ? (
          <div className="rounded-lg overflow-hidden mb-4">
            <ShaderImage4 width={300} height={300} />
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg mb-4"
            data-test-id="product-image"
          />
        )}
        <p>{product.description}</p>
        <p className="text-xl font-semibold mb-4" data-test-id="product-price">
          {product.price}
        </p>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
