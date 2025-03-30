// practice-generator.ts

import { Drill, PracticePlanFormInput } from './models';

export async function generatePracticePlan(
  input: PracticePlanFormInput
): Promise<any> {
  const { ageGroupId, skillCategoryIds, practiceLength } = input;

  const minutesPerDrill = Math.floor(practiceLength / skillCategoryIds.length);

  const generatedPlan = skillCategoryIds.map((id, index) => {
    return {
      skillCategoryId: id,
      drills: [
        {
          id: index + 1,
          name: `Drill for Skill ${id}`,
          description: `Practice drill for skill category ${id}`,
          durationMinutes: minutesPerDrill,
        },
      ],
    };
  });

  return {
    ageGroupId,
    practiceLength,
    plan: generatedPlan,
  };
}
