import { NextRequest, NextResponse } from 'next/server';
import { generatePracticePlan } from '@/lib/db/practice-generator';
import { PracticePlanFormInput } from '@/lib/db/models';

export async function POST(req: NextRequest) {
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

    const plan = await generatePracticePlan({
      ageGroupId: data.ageGroupId,
      skillCategoryIds: data.skillCategoryIds,
      practiceLength: data.practiceLength,
      drills: [] // optional or empty initial value
    });

    return NextResponse.json(plan);
  } catch (error: any) {
    console.error('Error generating plan:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
