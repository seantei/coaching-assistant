import { NextRequest, NextResponse } from 'next/server';
import { generatePracticePlan } from '@/lib/db/practice-generator';
import { PracticePlanFormInput } from '@/lib/db/database';

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as PracticePlanFormInput;

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

    const plan = await generatePracticePlan(
      [], // drills go first
      data.ageGroupId,
      data.skillCategoryIds,
      data.practiceLength
    );

    return NextResponse.json({ plan });
  } catch (error) {
    console.error('Error generating practice plan:', error);
    return NextResponse.json(
      { error: 'Failed to generate practice plan.' },
      { status: 500 }
    );
  }
}
