// src/components/Header.js

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
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
          />{' '}
          Cart
        </button>
      </Link>
    </header>
  );
}
