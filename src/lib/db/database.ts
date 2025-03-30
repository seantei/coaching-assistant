import { AgeGroup, CoolDown, Drill, PracticePlan, SkillCategory, WarmUp } from './models';

// Replace all D1Database types with `any`
export async function getAgeGroups(db: any): Promise<AgeGroup[]> {
  return [];
}
export async function getAgeGroupById(db: any, id: number): Promise<AgeGroup | null> {
  return null;
}
export async function getSkillCategories(db: any): Promise<SkillCategory[]> {
  return [];
}
export async function getSkillCategoryById(db: any, id: number): Promise<SkillCategory | null> {
  return null;
}
export async function getWarmUps(db: any, ageGroupId?: number): Promise<WarmUp[]> {
  return [];
}
export async function getCoolDowns(db: any, ageGroupId?: number): Promise<CoolDown[]> {
  return [];
}
export async function getDrills(db: any, skillCategoryId: number, ageGroupId: number): Promise<Drill[]> {
  return [];
}
export async function getDrillById(db: any, id: number): Promise<Drill | null> {
  return null;
}
export async function getDrillSkillCategories(db: any, drillId: number): Promise<SkillCategory[]> {
  return [];
}
export async function getDrillAgeGroups(db: any, drillId: number): Promise<AgeGroup[]> {
  return [];
}
export async function createPracticePlan(db: any, data: any): Promise<number> {
  return 1;
}
export async function addPracticeSection(db: any, planId: number, section: any): Promise<void> {
  return;
}
export async function getPracticePlanById(db: any, id: number): Promise<PracticePlan | null> {
  return null;
}
