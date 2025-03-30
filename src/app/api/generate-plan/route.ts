import { NextRequest } from 'next/server';
import { generatePracticePlan } from '@/lib/db/generator';
import {
  PracticePlanFormInput,
  getAgeGroupById,
  getSkillCategoryById,
  getDrills,
  getWarmUps,
  getCoolDowns,
  createPracticePlan,
  addPracticeSection,
} from '@/lib/db/database';

// TEMP: mock db object to allow successful build on Vercel
const db = {} as any;

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as PracticePlanFormInput;

    // Validate input
    if (!data.ageGroupId || !data.skillCategoryId) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
      });
    }

    const ageGroup = await getAgeGroupById(db, data.ageGroupId);
    const skillCategory = await getSkillCategoryById(db, data.skillCategoryId);

    if (!ageGroup || !skillCategory) {
      return new Response(JSON.stringify({ error: 'Invalid age group or skill category' }), {
        status: 400,
      });
    }

    const drills = await getDrills(db, data.skillCategoryId, data.ageGroupId);
    const warmUps = await getWarmUps(db, data.ageGroupId);
    const coolDowns = await getCoolDowns(db, data.ageGroupId);

    const plan = await generatePracticePlan(drills, warmUps, coolDowns, data);

    const practicePlanId = await createPracticePlan(db, data);
    await addPracticeSection(db, practicePlanId, plan);

    return new Response(JSON.stringify({ success: true, practicePlanId }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error generating plan:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
