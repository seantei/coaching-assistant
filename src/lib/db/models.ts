// Database models for Coaches Assistant

export interface AgeGroup {
  id: number;
  name: string;
  minAge: number;
  maxAge: number;
  waterBreakFrequency: number;
  warmUpDuration: number;
  coolDownDuration: number;
  createdAt: string;
}

export interface SkillCategory {
  id: number;
  name: string;
  description: string;
  iconUrl?: string;
  createdAt: string;
}

export interface WarmUp {
  id: number;
  name: string;
  description: string;
  duration: number;
  equipment?: string;
  imageUrl?: string;
  createdAt: string;
  ageGroups: AgeGroup[];
}

export interface CoolDown {
  id: number;
  name: string;
  description: string;
  duration: number;
  equipment?: string;
  imageUrl?: string;
  createdAt: string;
  ageGroups: AgeGroup[];
}

export interface Drill {
  id: number;
  name: string;
  objective: string;
  description: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  minPlayers: number;
  maxPlayers?: number;
  equipment?: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt: string;
  skillCategories: SkillCategory[];
  ageGroups: AgeGroup[];
}

export interface PracticePlan {
  id: number;
  totalDuration: number;
  ageGroup: AgeGroup;
  skillFocus: SkillCategory[];
  sections: PracticeSection[];
  createdAt: string;
}

export type SectionType = 'warm-up' | 'drill' | 'water-break' | 'cool-down';

export interface PracticeSection {
  id: number;
  practicePlanId: number;
  sectionType: SectionType;
  name: string;
  startTime: string;
  endTime: string;
  duration: number;
  detailsId?: number;
  detailsType?: string;
  sequenceOrder: number;
  createdAt: string;
}

// Form input types
export interface PracticePlanFormInput {
  duration: number;
  ageGroupId: number;
  skillCategoryIds: number[];
}
