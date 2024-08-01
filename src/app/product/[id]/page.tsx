import Image from 'next/image';
import { getProductById } from '../../../databases/products';
import { Product } from '../../../types/Product';
import ShaderImage1 from '../../../components/ShaderImage1';
import ShaderImage2 from '../../../components/ShaderImage2';
import ShaderImage3 from '../../../components/ShaderImage3';
import ShaderImage4 from '../../../components/ShaderImage4';
import AddToCartButton from '../../../components/AddToCartButton';

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product: Product | null = await getProductById(Number(params.id));

  if (!product) {
    return (
      <div className="container mx-auto p-7 pt-0">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 pt-0">
      <div className="rounded-lg bg-yellow-50 bg-opacity-60 overflow-hidden shadow-md p-6 flex">
        {product.shaderPath && (
          <div className="mr-8">
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
        )}
        {!product.shaderPath && (
          <Image
            src={product.image}
            alt={product.name}
            className="mr-8"
            style={{ width: '300px', height: '300px', objectFit: 'cover' }}
            data-test-id="product-image"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p
            className="text-xl font-semibold mb-4"
            data-test-id="product-price"
          >
            ${product.price}
          </p>
          <p className="mb-8">{product.description}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
