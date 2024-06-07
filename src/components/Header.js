import Link from 'next/link';

export default function Header() {
  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold mb-4">The Digital Amulet Vault</h1>
      <Link href="/" className="ml-4" data-test-id="products-link">
        <span className="text-blue-500 hover:underline">Products</span>
      </Link>
      {/* <Link href="/products" className="ml-4" data-test-id="products-link">
        <span className="text-blue-500 hover:underline">Products</span>
      </Link> */}
    </header>
  );
}
