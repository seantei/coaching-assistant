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

    // Pass arguments individually as expected by the function
    const plan = await generatePracticePlan(
      data.ageGroupId,
      data.skillCategoryIds,
      data.practiceLength,
      undefined // if there's a 4
