import { PracticePlanFormInput, Drill, SkillCategory } from './models';
import {
  getAgeGroupById,
  getSkillCategoryById,
  getDrills,
} from './database';

export async function generatePracticePlan(
  input: PracticePlanFormInput
): Promise<Drill[]> {
  const { ageGroupId, skillCategoryIds, practiceLengthMinutes } = input;

  const ageGroup = getAgeGroupById(ageGroupId);
  if (!ageGroup) {
    throw new Error('Invalid age group ID');
  }

  const skillCategories: SkillCategory[] = skillCategoryIds
    .map(getSkillCategoryById)
    .filter((sc): sc is SkillCategory => !!sc);

  if (skillCategories.length === 0) {
    throw new Error('No valid skill categories found');
  }

  const allDrills = getDrills();
  const matchingDrills = allDrills.filter((drill) =>
    skillCategoryIds.includes(drill.skillCategoryId)
  );

  // Simple sorting algorithm by difficulty and age group
  const sortedDrills = matchingDrills.sort((a, b) => {
    const ageDiff =
      Math.abs(ageGroup.minAge - a.minAge) -
      Math.abs(ageGroup.minAge - b.minAge);
    return ageDiff;
  });

  const drills: Drill[] = [];
  let totalDuration = 0;

  for (const drill of sortedDrills) {
    if (totalDuration + drill.durationMinutes > practiceLengthMinutes) break;
    drills.push(drill);
    totalDuration += drill.durationMinutes;
  }

  return drills;
}
