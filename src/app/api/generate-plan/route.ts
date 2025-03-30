// route.ts

import { NextResponse } from 'next/server';
import { generatePracticePlan } from '@/app/api/generate-plan/practice-generator';
import { PracticePlanFormInput } from '@/app/api/generate-plan/models';

export async function POST(req: Request) {
  try {
    const data: PracticePlanFormInput = await req.json();

    if (
      !data.ageGroupId ||
      !data.skillCategoryIds?.length ||
      !data.practiceLength
    ) {
      return NextResponse.json(
        { error: 'Missing required input fields.' },
        { status: 400 }
      );
    }

    const plan = await generatePracticePlan(data);

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error generating practice plan:', error);
    return NextResponse.json(
      { error: 'Failed to generate practice plan.' },
      { status: 500 }
    );
  }
}
