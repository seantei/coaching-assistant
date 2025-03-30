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
    if (
      !data.ageGroupId ||
      !data.skillCategoryIds?.length ||
      !data.practiceLengthMinutes
    ) {
      return NextResponse.json(
        { error: 'Missing required input fields.' },
        { status: 400 }
      );
    }

    // Fetch needed info from DB
    const ageGroup = await getAgeGroupById(data.ageGroupId);
    const skillCategories = await Promise.all(
      data.skillCategoryIds.map((id) => getSkillCategoryById(id))
    );
    const drills = await getDrills();
    const warmUps = await getWarmUps(data.ageGroupId);
    const coolDowns = await getCoolDowns(data.ageGroupId);

    if (!ageGroup || skillCategories.some((cat) => !cat)) {
      return NextResponse.json(
        { error: 'Invalid age group or one or more skill categories.' },
        { status: 400 }
      );
    }

    const plan = generatePracticePlan({
      ageGroup,
      skillCategories: skillCategories.filter(Boolean),
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
