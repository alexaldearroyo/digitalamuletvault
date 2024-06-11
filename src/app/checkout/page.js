import Link from 'next/link';
import Header from '../../components/Header';

const CheckoutPage = () => {
  return (
    <div className="container mx-auto p-6">
      <Header />
      <main className="mt-8">
        <p className="text-lg text-gray-600 mb-6">
          Your order has been placed successfully!
        </p>
        <Link href="/">
          <span className="inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300">
            Continue Shopping
          </span>
        </Link>
      </main>
    </div>
  );
};

export default CheckoutPage;
