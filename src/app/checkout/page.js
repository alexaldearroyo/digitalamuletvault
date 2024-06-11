import Link from 'next/link';
import Header from '../../components/Header';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto p-6">
      <Header />
      <h1>Checkout Page</h1>
      <p>Your order has been placed successfully!</p>
      <Link href="/">
        <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}
