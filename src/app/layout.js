import { Inter } from 'next/font/google';
import './globals.css';
import '../fontawesome';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Digital Amulet Vault',
  description: 'Get the charms from the interwebs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
