import { Drill, PracticePlanFormInput } from './models'

export async function generatePracticePlan(
  drills: Drill[],
  warmUps: Drill[],
  coolDowns: Drill[],
  data: PracticePlanFormInput
) {
  // Simple placeholder logic for now
  return {
    sections: [
      { title: 'Warm-Up', drills: warmUps },
      { title: 'Skill Drills', drills: drills },
      { title: 'Cool Down', drills: coolDowns }
    ],
    metadata: {
      ageGroupId: data.ageGroupId,
      skillCategoryId: data.skillCategoryId
    }
  }
}
