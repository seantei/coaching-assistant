import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { PracticeForm } from '@/components/practice-form';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  // Dummy data to satisfy required props
  const dummyAgeGroups = [
    { id: 1, name: 'Under 10' },
    { id: 2, name: 'Under 12' },
  ];

  const dummySkillCategories = [
    { id: 1, name: 'Dribbling' },
    { id: 2, name: 'Shooting' },
  ];

  const handleSubmit = async (formData: any) => {
    console.log('Submitted form data:', formData);
  };

  return (
    <main className={`min-h-screen p-6 ${inter.className}`}>
      <h1 className="text-3xl font-bold mb-4">Create a Practice Plan</h1>
      <Suspense fallback={<div>Loading form...</div>}>
        <PracticeForm
          ageGroups={dummyAgeGroups}
          skillCategories={dummySkillCategories}
          onSubmit={handleSubmit}
          isLoading={false}
        />
      </Suspense>
    </main>
  );
}
