// API route for generating practice plans
import { NextRequest, NextResponse } from 'next/server';
import { generatePracticePlan } from '../../../lib/db/practice-generator';
import { PracticePlanFormInput } from '@/lib/db/models';
import {
  getAgeGroupById,
  getSkillCategoryById,
  getDrills,
  getCoolDowns,
  getWarmUps,
} from '@/lib/db/database';

// POST /api/generate-plan
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as PracticePlanFormInput;

    // Validate input
    if (!data.ageGroupId || !data.skillCategoryId || !data.practiceLengthMinutes) {
      return NextResponse.json({ error: 'Missing required input fields.' }, { status: 400 });
    }

    // Get required data from the database
    const ageGroup = await getAgeGroupById(data.ageGroupId);
    const skillCategory = await getSkillCategoryById(data.skillCategoryId);
    const drills = await getDrills();
    const warmUps = await getWarmUps(data.ageGroupId);
    const coolDowns = await getCoolDowns(data.ageGroupId);

    if (!ageGroup || !skillCategory) {
      return NextResponse.json({ error: 'Invalid age group or skill category.' }, { status: 400 });
    }

    const plan = generatePracticePlan({
      ageGroup,
      skillCategory,
      practiceLengthMinutes: data.practiceLengthMinutes,
      drills,
      warmUps,
      coolDowns,
    });

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error generating practice plan:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
