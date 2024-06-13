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
    <header className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">The Digital Amulet Vault</h1>
        <Link href="/" className="ml-4" data-test-id="products-link">
          <span className="text-blue-500 hover:underline">Products</span>
        </Link>
      </div>
      <Link href="/cart" className="ml-4" data-test-id="cart-link">
        <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 flex items-center justify-center">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-white text-xl"
          />
          <span className="ml-2 text-sm" data-test-id="cart-count">
            {cartCount}
          </span>
        </button>
      </Link>
    </header>
  );
}
