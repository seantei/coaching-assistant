export interface PracticePlanFormInput {
  ageGroupId: number;
  skillCategoryIds: number[];
  practiceLength: number;
}

export interface Drill {
  id: number;
  name: string;
  description: string;
  durationMinutes: number;
}
