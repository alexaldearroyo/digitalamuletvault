'use client'; // Esto asegura que el archivo se trate como un componente de cliente

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/productslist');
  }, [router]);

  return null;
}
