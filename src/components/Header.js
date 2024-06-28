'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';

export default function Header() {
  const { cart } = useCart();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cart.reduce((total, product) => total + product.quantity, 0));
  }, [cart]);

  return (
    <header className="mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl sm:text-3xl font-bold mb-0">
          The Digital Amulet Vault
        </h1>
        <Link href="/cart" className="ml-4" data-test-id="cart-link">
          <button className="bg-teal-500 text-yellow-50 px-6 py-3 rounded hover:bg-teal-600 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-yellow-50 text-xl"
            />
            <span className="ml-2 text-sm" data-test-id="cart-count">
              {cartCount}
            </span>
          </button>
        </Link>
      </div>
      <div className="bg-dark py-2 text-white rounded-lg mt-4">
        <Link
          href="/"
          className="ml-3 text-yellow-500 hover:text-yellow-50 no-underline"
          data-test-id="products-link"
        >
          <span>Products Test 1011</span>
        </Link>
      </div>
    </header>
  );
}
