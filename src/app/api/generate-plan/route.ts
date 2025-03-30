import { NextRequest, NextResponse } from 'next/server';
import { generatePracticePlan } from '@/lib/practice-generator';
import { PracticePlanFormInput } from '@/lib/db/models';

export async function POST(req: NextRequest) {
  try {
    const data: PracticePlanFormInput = await req.json();

    // Validate input
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

    // Generate the plan with an empty drills array
    const plan = await generatePracticePlan(
      data.ageGroupId,
      data.skillCategoryIds,
      data.practiceLength,
      [] // <--- this fixes the error
    );

    return NextResponse.json({ plan }, { status: 200 });
  } catch (error) {
    console.error('Error generating practice plan:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
