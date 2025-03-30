import {
  Drill,
  PracticePlan,
  PracticePlanFormInput,
  WarmUp,
  CoolDown,
} from './models';

export async function generatePracticePlan({
  ageGroupId,
  skillCategoryIds,
  practiceLength,
}: PracticePlanFormInput): Promise<PracticePlan> {
  // Placeholder mocks
  const warmUps: WarmUp[] = [
    {
      id: 1,
      name: 'Dynamic Stretches',
      description: 'Loosen up the muscles with dynamic movements',
      ageGroups: [{ id: ageGroupId, name: 'U10' }],
    },
  ];

  const drills: Drill[] = skillCategoryIds.map((skillCategoryId, index) => ({
    id: index + 1,
    name: `Drill ${index + 1}`,
    description: `Description for drill ${index + 1}`,
    ageGroups: [{ id: ageGroupId, name: 'U10' }],
    skillCategories: [{ id: skillCategoryId, name: `Skill ${skillCategoryId}` }],
  }));

  const coolDowns: CoolDown[] = [
    {
      id: 1,
      name: 'Static Stretches',
      description: 'Wind down with some static stretching',
      ageGroups: [{ id: ageGroupId, name: 'U10' }],
    },
  ];

  return {
    id: Date.now(),
    name: `Practice Plan - ${new Date().toLocaleDateString()}`,
    warmUps,
    drills,
    coolDowns,
  };
}
