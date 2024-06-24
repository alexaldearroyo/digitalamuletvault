'use client'; // Component only runs on the client (browser).

import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Header from '../../components/Header';
import { Metadata } from 'next';
// import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Cart page showing products ready to be checked out.',
};

export default function CartPage() {
  const { cart, removeFromCart } = useCart(); // Import the methods and data from the context of the cart.

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  return (
    <div>
      {/* <Head>
        <title>Cart</title>
        <meta
          name="description"
          content="Cart page showing products ready to be checked out."
        />
      </Head> */}
      <div className="container mx-auto p-6">
        <Header />
        <div className="cart bg-yellow-50 bg-opacity-75  rounded-lg shadow-md p-8">
          {cart.length === 0 ? (
            <p className="text-center text-gray-600">
              No products in the cart.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {cart.map(
                (
                  product, // Iterate over products in the cart
                ) => (
                  <div
                    className="cart-product bg-red-50 rounded-lg p-4 flex flex-col shadow-md"
                    key={product.id}
                    data-test-id={`cart-product-${product.id}`}
                  >
                    <div className="flex-grow">
                      <h2 className="text-lg font-medium text-gray-700">
                        {product.name}
                      </h2>
                      <p
                        className="text-gray-500"
                        data-test-id={`cart-product-quantity-${product.id}`}
                      >
                        Quantity: {product.quantity}
                      </p>
                    </div>
                    <div className="flex-shrink mt-auto">
                      <p className="text-gray-500">
                        Subtotal:{' '}
                        {(product.price * product.quantity).toFixed(2)}
                      </p>
                      <button
                        className="text-red-500 hover:underline mt-2"
                        onClick={() => removeFromCart(product.id)}
                        data-test-id={`cart-product-remove-${product.id}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
          {cart.length > 0 && (
            <div className="mt-6">
              <p className="text-gray-600" data-test-id="cart-total">
                Total: {totalPrice.toFixed(2)}
              </p>
              <Link href="/checkout">
                <button
                  className="btn-turqoise mt-4 rounded"
                  data-test-id="cart-checkout"
                >
                  Checkout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
