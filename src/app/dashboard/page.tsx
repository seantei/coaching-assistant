// src/app/dashboard/page.tsx

'use client';

import React, { Suspense } from 'react';
import PracticePlanDisplay from '@/components/PracticePlanDisplay';

export default function DashboardPage() {
  const dummyPlan = {
    ageGroupId: 1,
    practiceLength: 60,
    plan: [],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Practice Plans</h2>
      <Suspense fallback={<div>Loading practice plans...</div>}>
        <PracticePlanDisplay plan={dummyPlan} />
      </Suspense>
    </div>
  );
}
