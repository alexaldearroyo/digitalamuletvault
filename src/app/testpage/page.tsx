import Image from 'next/image';
import Link from 'next/link';
import { getAllProducts } from '../../databases/products';
import { Product } from '../../types/Product';
import ShaderImage1 from '../../components/ShaderImage1';
import ShaderImage2 from '../../components/ShaderImage2';
import ShaderImage3 from '../../components/ShaderImage3';
import ShaderImage4 from '../../components/ShaderImage4';

type ProductLinkProps = {
  product: Product;
};

const ProductLink: React.FC<ProductLinkProps> = ({ product }) => {
  return (
    <Link
      href={`/product/${product.id.toString()}`}
      key={product.id}
      data-test-id={`product-${product.id}`}
      className="product-card"
    >
      <div style={{ cursor: 'pointer' }}>
        {product.shaderPath ? (
          <div className="rounded-lg overflow-hidden">
            {product.shaderPath === 'ShaderImage1' && (
              <ShaderImage1 width={300} height={300} />
            )}
            {product.shaderPath === 'ShaderImage2' && (
              <ShaderImage2 width={300} height={300} />
            )}
            {product.shaderPath === 'ShaderImage3' && (
              <ShaderImage3 width={300} height={300} />
            )}
            {product.shaderPath === 'ShaderImage4' && (
              <ShaderImage4 width={300} height={300} />
            )}
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="rounded-lg mb-4"
          />
        )}
        <h2>{product.name}</h2>
      </div>
    </Link>
  );
};

const ProductsPage: React.FC = async () => {
  try {
    const products: Product[] = await getAllProducts();
    console.log('Obtained products:', products);

    if (!products || products.length === 0) {
      console.log('Products not found');
    }

    return (
      <div className="container mx-auto p-6 pt-0">
        <div className="product-list">
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((product) => (
              <ProductLink product={product} key={product.id} />
            ))
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <div className="container mx-auto p-7 pt-0">
        <p>Error fetching products</p>
      </div>
    );
  }
};

export default ProductsPage;
