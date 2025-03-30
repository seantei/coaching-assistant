// src/app/page.tsx

import { Inter } from 'next/font/google';
import { PracticeForm } from '@/components/practice-form';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`min-h-screen p-6 ${inter.className}`}>
      <h1 className="text-3xl font-bold mb-4">Create a Practice Plan</h1>
      <Suspense fallback={<div>Loading form...</div>}>
        <PracticeForm />
      </Suspense>
    </main>
  );
}
