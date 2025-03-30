// src/lib/db/database.ts
// TEMP: mock import for D1Database to avoid build errors
type D1Database = any

import {
  AgeGroup,
  SkillCategory,
  WarmUp,
  CoolDown,
  Drill,
  PracticePlan,
} from './models'

export async function getAgeGroups(db: D1Database): Promise<AgeGroup[]> {
  return []
}

export async function getAgeGroupById(db: D1Database, id: number): Promise<AgeGroup | null> {
  return null
}

export async function getSkillCategories(db: D1Database): Promise<SkillCategory[]> {
  return []
}

export async function getSkillCategoryById(db: D1Database, id: number): Promise<SkillCategory | null> {
  return null
}

export async function getWarmUps(db: D1Database, ageGroupId?: number): Promise<WarmUp[]> {
  return []
}

export async function getCoolDowns(db: D1Database, ageGroupId?: number): Promise<CoolDown[]> {
  return []
}

export async function getDrills(db: D1Database, skillCategoryId?: number, ageGroupId?: number): Promise<Drill[]> {
  return []
}

export async function createPracticePlan(db: D1Database, input: PracticePlan): Promise<number> {
  return 1
}

export async function addPracticeSection(db: D1Database, planId: number, section: any): Promise<void> {
  return
}
