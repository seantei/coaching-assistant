import { NextRequest, NextResponse } from 'next/server';
import { generatePracticePlan } from '../../../lib/db/practice-generator';
import {
  PracticePlanFormInput
} from '@/lib/db/models';

export async function POST(req: NextRequest) {
  try {
    const data: PracticePlanFormInput = await req.json();

    // Validate input
    if (
      !data.ageGroupId ||
      !data.skillCategoryIds?.length ||
      !data.practiceLength
    ) {
      return NextResponse.json({ error: 'Missing required input fields.' }, { status: 400 });
    }

    const plan = await generatePracticePlan({
      ageGroupId: data.ageGroupId,
      skillCategoryIds: data.skillCategoryIds,
      practiceLength: data.practiceLength,
    });

    return NextResponse.json(plan);
  } catch (error) {
    console.error('[generatePlan]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
