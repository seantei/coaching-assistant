// src/lib/db/models.ts

export type PracticePlanFormInput = {
  playerLevel: string;
  sessionFocus: string;
  ageGroup: string;
};

export type Drill = {
  id: number;
  name: string;
  objective: string;
  description: string;
  duration: number;
  difficulty: string;
};

export type PracticePlan = {
  id: string;
  title: string;
  ageGroup: string;
  skillCategory: string;
  drills: Drill[];
  createdAt: Date;
};

export type PracticeFormProps = {
  ageGroups: string[];
  skillCategories: string[];
  onSubmit: (data: PracticePlanFormInput) => void;
  isLoading: boolean;
};

export type PracticePlanDisplayProps = {
  plan: PracticePlan;
};
