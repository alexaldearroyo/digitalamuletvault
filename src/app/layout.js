import { Inter } from 'next/font/google';
import './globals.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { CartProvider } from '../context/CartContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

library.add(fas, fab);

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Digital Amulet Vault',
  description: 'Get the charms from the interwebs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-w-screen min-h-screen flex flex-col`}
      >
        <div className="flex-grow">
          {/* <Header /> */}
          <CartProvider>{children}</CartProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
