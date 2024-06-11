'use client';

import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Header from '../../components/Header';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  return (
    <div className="container mx-auto p-6">
      <Header />
      <div className="cart">
        {cart.length === 0 ? (
          <p>No products in the cart.</p>
        ) : (
          cart.map((product) => (
            <div
              className="cart-product"
              key={product.id}
              data-test-id={`cart-product-${product.id}`}
            >
              <h2>{product.name}</h2>
              <p data-test-id={`cart-product-quantity-${product.id}`}>
                {product.quantity}
              </p>
              <p>{(product.price * product.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeFromCart(product.id)}
                data-test-id={`cart-product-remove-${product.id}`}
              >
                Remove
              </button>
            </div>
          ))
        )}
        <div data-test-id="cart-total">{totalPrice.toFixed(2)}</div>
        <Link href="/checkout">
          <button data-test-id="cart-checkout">Checkout</button>
        </Link>
      </div>
    </div>
  );
}
