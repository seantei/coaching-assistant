import { PracticePlanDisplay } from '@/components/practice-plan-display';
import { DrillLibrary } from '@/components/drill-library';
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <h1 className="text-4xl font-bold mb-8 text-center">Coaching Assistant Dashboard</h1>
      
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Practice Plans</h2>
          <Suspense fallback={<div>Loading practice plans...</div>}>
            <PracticePlanDisplay />
          </Suspense>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Drill Library</h2>
          <Suspense fallback={<div>Loading drill library...</div>}>
            <DrillLibrary />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
