import Link from 'next/link';
import Header from '../components/Header';
import ShaderImage1 from '../components/ShaderImage1';
import ShaderImage2 from '../components/ShaderImage2';
import ShaderImage3 from '../components/ShaderImage3';
import ShaderImage4 from '../components/ShaderImage4';

// change name of function later
const mockProducts = [
  { id: 2, name: 'Deep Amulet' },
  { id: 4, name: 'Spherical Amulet' },
  { id: 3, name: 'Fractal Amulet' },
  { id: 1, name: 'Smooth Amulet' },
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
              {product.id === 1 ? (
                <div className="rounded-lg overflow-hidden">
                  <ShaderImage1 width={300} height={300} />
                </div>
              ) : product.id === 2 ? (
                <div className="rounded-lg overflow-hidden">
                  <ShaderImage2 width={300} height={300} />
                </div>
              ) : product.id === 3 ? (
                <div className="rounded-lg overflow-hidden">
                  <ShaderImage3 width={300} height={300} />
                </div>
              ) : product.id === 4 ? (
                <div className="rounded-lg overflow-hidden">
                  <ShaderImage4 width={300} height={300} />
                </div>
              ) : (
                <img
                  src={`/images/product${product.id}.jpg`}
                  alt={product.name}
                  className="rounded-lg mb-4"
                />
              )}
              <h2>{product.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
