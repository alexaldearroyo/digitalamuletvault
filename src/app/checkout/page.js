'use client';

import Link from 'next/link';
// import Head from 'next/head';
import { Metadata } from 'next';
import Header from '../../components/Header';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { removeCartFromCookies } from '../../utils/cookies';

export const metadata: Metadata = {
  title: 'Checkout Page',
  description: 'Checkout page showing products set to be purchased.',
};

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
    removeCartFromCookies();
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
    <div>
      {/* <Head>
        <title>Checkout Page</title>
        <meta
          name="description"
          content="Checkout page showing products set to be purchased."
        />
      </Head> */}
      <div className="min-h-screen py-6 sm:py-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header />
        </div>
        <div className="flex items-start justify-center mt-0 sm:mt-2">
          <main className="mt-8 w-full max-w-lg bg-yellow-50 bg-opacity-60 rounded-lg shadow-md">
            <div className="p-4 sm:p-6 lg:p-8">
              <p className="text-lg text-gray-600 mb-6">Total: {totalPrice}</p>
              <hr className="my-4" /> {/* Separator line */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold">Shipping Address</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label>
                      First Name:
                      <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        placeholder="Enter First Name"
                        data-test-id="checkout-first-name"
                        onChange={handleChange}
                        className="input-field"
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
                        placeholder="Enter Last Name"
                        data-test-id="checkout-last-name"
                        onChange={handleChange}
                        className="input-field"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Enter Email"
                      data-test-id="checkout-email"
                      onChange={handleChange}
                      className="input-field"
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
                      placeholder="Enter Address"
                      data-test-id="checkout-address"
                      onChange={handleChange}
                      className="input-field"
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
                      placeholder="Enter City"
                      data-test-id="checkout-city"
                      onChange={handleChange}
                      className="input-field"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label>
                      Postal Code:
                      <input
                        type="text"
                        name="postalCode"
                        value={postalCode}
                        placeholder="Enter Postal Code"
                        data-test-id="checkout-postal-code"
                        onChange={handleChange}
                        className="input-field"
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
                        placeholder="Enter Country"
                        data-test-id="checkout-country"
                        onChange={handleChange}
                        className="input-field"
                      />
                    </label>
                  </div>
                </div>

                <h2 className="text-xl font-semibold">Payment Information</h2>

                <div>
                  <label>
                    Credit Card:
                    <input
                      type="text"
                      name="creditCard"
                      value={creditCard}
                      placeholder="Enter Credit Card"
                      data-test-id="checkout-credit-card"
                      onChange={handleChange}
                      className="input-field"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <label>
                      Expiration Date:
                      <input
                        type="text"
                        name="expirationDate"
                        value={expirationDate}
                        placeholder="Enter Expiration Date"
                        data-test-id="checkout-expiration-date"
                        onChange={handleChange}
                        className="input-field"
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
                        placeholder="Enter Security Code"
                        data-test-id="checkout-security-code"
                        onChange={handleChange}
                        className="input-field"
                      />
                    </label>
                  </div>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <div className="flex justify-center space-x-4 pt-5 pb-4">
                  <button
                    type="submit"
                    data-test-id="checkout-confirm-order"
                    className="bg-teal-500 text-yellow-50 px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-300"
                  >
                    Confirm Order
                  </button>

                  <Link href="/">
                    <span className="inline-block bg-teal-500 text-yellow-50 px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-300">
                      Continue Shopping
                    </span>
                  </Link>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
