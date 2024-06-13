'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    creditCard: '',
    expirationDate: '',
    securityCode: '',
  });
  const [error, setError] = useState('');

  const { cart, setCart } = useCart();
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form validation
    for (let key in formData) {
      if (formData[key] === '') {
        setError('All fields are required');
        return;
      }
    }

    // Clear the cart cookies and context
    Cookies.remove('cart');
    setCart([]); // Clear the cart context

    // Redirect to the thank you page
    router.push('/thankyou');
  };

  const {
    firstName,
    lastName,
    email,
    address,
    city,
    postalCode,
    country,
    creditCard,
    expirationDate,
    securityCode,
  } = formData;

  const totalPrice = cart
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto p-6">
      <Header />
      <main className="mt-8">
        <p className="text-lg text-gray-600 mb-6">Total: {totalPrice}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={firstName}
                data-test-id="checkout-first-name"
                onChange={handleChange}
                className="border-gray-300 rounded p-2 w-full"
              />
            </label>
          </div>

          <div>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={lastName}
                data-test-id="checkout-last-name"
                onChange={handleChange}
                className="border-gray-300 rounded p-2 w-full"
              />
            </label>
          </div>

          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={email}
                data-test-id="checkout-email"
                onChange={handleChange}
                className="border-gray-300 rounded p-2 w-full"
              />
            </label>
          </div>

          <div>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={address}
                data-test-id="checkout-address"
                onChange={handleChange}
                className="border-gray-300 rounded p-2 w-full"
              />
            </label>
          </div>

          <div>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={city}
                data-test-id="checkout-city"
                onChange={handleChange}
                className="border-gray-300 rounded p-2 w-full"
              />
            </label>
          </div>

          <div>
            <label>
              Postal Code:
              <input
                type="text"
                name="postalCode"
                value={postalCode}
                data-test-id="checkout-postal-code"
                onChange={handleChange}
                className="border-gray-300 rounded p-2 w-full"
              />
            </label>
          </div>

          <div>
            <label>
              Country:
              <input
                type="text"
                name="country"
                value={country}
                data-test-id="checkout-country"
                onChange={handleChange}
                className="border-gray-300 rounded p-2 w-full"
              />
            </label>
          </div>

          <div>
            <label>
              Credit Card:
              <input
                type="text"
                name="creditCard"
                value={creditCard}
                data-test-id="checkout-credit-card"
                onChange={handleChange}
                className="border-gray-300 rounded p-2 w-full"
              />
            </label>
          </div>

          <div>
            <label>
              Expiration Date:
              <input
                type="text"
                name="expirationDate"
                value={expirationDate}
                data-test-id="checkout-expiration-date"
                onChange={handleChange}
                className="border-gray-300 rounded p-2 w-full"
              />
            </label>
          </div>

          <div>
            <label>
              Security Code:
              <input
                type="text"
                name="securityCode"
                value={securityCode}
                data-test-id="checkout-security-code"
                onChange={handleChange}
                className="border-gray-300 rounded p-2 w-full"
              />
            </label>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div>
            <button
              type="submit"
              data-test-id="checkout-confirm-order"
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
            >
              Confirm Order
            </button>
          </div>
        </form>

        <Link href="/">
          <span className="inline-block bg-blue-500 text-white px-6 py-3 rounded mt-4 hover:bg-blue-600 transition duration-300">
            Continue Shopping
          </span>
        </Link>
      </main>
    </div>
  );
};

export default CheckoutPage;
