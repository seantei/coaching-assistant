export interface AgeGroup {
  id: number;
  name: string;
}

export interface SkillCategory {
  id: number;
  name: string;
}

export interface WarmUp {
  id: number;
  name: string;
  description: string;
  ageGroups: AgeGroup[];
}

export interface CoolDown {
  id: number;
  name: string;
  description: string;
  ageGroups: AgeGroup[];
}

export interface Drill {
  id: number;
  name: string;
  description: string;
  ageGroups: AgeGroup[];
  skillCategories: SkillCategory[];
}

export interface PracticePlan {
  id: number;
  name: string;
  warmUps: WarmUp[];
  drills: Drill[];
  coolDowns: CoolDown[];
}

export interface PracticePlanFormInput {
  ageGroupId: number;
  skillCategoryIds: number[];
  practiceLength: number; // renamed to match usage in route.ts
}
