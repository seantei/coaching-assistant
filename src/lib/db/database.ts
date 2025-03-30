// Database access functions for Coaches Assistant

import { 
  AgeGroup, 
  SkillCategory, 
  WarmUp, 
  CoolDown, 
  Drill, 
  PracticePlan,
  PracticeSection,
  SectionType
} from './models';

// Age Group functions
export async function getAgeGroups(db: D1Database): Promise<AgeGroup[]> {
  const { results } = await db.prepare(
    'SELECT id, name, min_age as minAge, max_age as maxAge, water_break_frequency as waterBreakFrequency, ' +
    'warm_up_duration as warmUpDuration, cool_down_duration as coolDownDuration, created_at as createdAt ' +
    'FROM age_groups ORDER BY min_age'
  ).all();
  
  return results as AgeGroup[];
}

export async function getAgeGroupById(db: D1Database, id: number): Promise<AgeGroup | null> {
  const result = await db.prepare(
    'SELECT id, name, min_age as minAge, max_age as maxAge, water_break_frequency as waterBreakFrequency, ' +
    'warm_up_duration as warmUpDuration, cool_down_duration as coolDownDuration, created_at as createdAt ' +
    'FROM age_groups WHERE id = ?'
  ).bind(id).first();
  
  return result as AgeGroup | null;
}

// Skill Category functions
export async function getSkillCategories(db: D1Database): Promise<SkillCategory[]> {
  const { results } = await db.prepare(
    'SELECT id, name, description, icon_url as iconUrl, created_at as createdAt ' +
    'FROM skill_categories ORDER BY name'
  ).all();
  
  return results as SkillCategory[];
}

export async function getSkillCategoryById(db: D1Database, id: number): Promise<SkillCategory | null> {
  const result = await db.prepare(
    'SELECT id, name, description, icon_url as iconUrl, created_at as createdAt ' +
    'FROM skill_categories WHERE id = ?'
  ).bind(id).first();
  
  return result as SkillCategory | null;
}

// Warm-up functions
export async function getWarmUps(db: D1Database, ageGroupId?: number): Promise<WarmUp[]> {
  let query = 'SELECT w.id, w.name, w.description, w.duration, w.equipment, ' +
              'w.image_url as imageUrl, w.created_at as createdAt ' +
              'FROM warm_ups w';
  
  if (ageGroupId) {
    query += ' JOIN warm_up_age_groups wag ON w.id = wag.warm_up_id ' +
             'WHERE wag.age_group_id = ?';
    
    const { results } = await db.prepare(query).bind(ageGroupId).all();
    const warmUps = results as WarmUp[];
    
    // Get age groups for each warm-up
    for (const warmUp of warmUps) {
      warmUp.ageGroups = await getWarmUpAgeGroups(db, warmUp.id);
    }
    
    return warmUps;
  } else {
    const { results } = await db.prepare(query).all();
    const warmUps = results as WarmUp[];
    
    // Get age groups for each warm-up
    for (const warmUp of warmUps) {
      warmUp.ageGroups = await getWarmUpAgeGroups(db, warmUp.id);
    }
    
    return warmUps;
  }
}

async function getWarmUpAgeGroups(db: D1Database, warmUpId: number): Promise<AgeGroup[]> {
  const { results } = await db.prepare(
    'SELECT ag.id, ag.name, ag.min_age as minAge, ag.max_age as maxAge, ' +
    'ag.water_break_frequency as waterBreakFrequency, ag.warm_up_duration as warmUpDuration, ' +
    'ag.cool_down_duration as coolDownDuration, ag.created_at as createdAt ' +
    'FROM age_groups ag ' +
    'JOIN warm_up_age_groups wag ON ag.id = wag.age_group_id ' +
    'WHERE wag.warm_up_id = ?'
  ).bind(warmUpId).all();
  
  return results as AgeGroup[];
}

// Cool-down functions
export async function getCoolDowns(db: D1Database, ageGroupId?: number): Promise<CoolDown[]> {
  let query = 'SELECT c.id, c.name, c.description, c.duration, c.equipment, ' +
              'c.image_url as imageUrl, c.created_at as createdAt ' +
              'FROM cool_downs c';
  
  if (ageGroupId) {
    query += ' JOIN cool_down_age_groups cag ON c.id = cag.cool_down_id ' +
             'WHERE cag.age_group_id = ?';
    
    const { results } = await db.prepare(query).bind(ageGroupId).all();
    const coolDowns = results as CoolDown[];
    
    // Get age groups for each cool-down
    for (const coolDown of coolDowns) {
      coolDown.ageGroups = await getCoolDownAgeGroups(db, coolDown.id);
    }
    
    return coolDowns;
  } else {
    const { results } = await db.prepare(query).all();
    const coolDowns = results as CoolDown[];
    
    // Get age groups for each cool-down
    for (const coolDown of coolDowns) {
      coolDown.ageGroups = await getCoolDownAgeGroups(db, coolDown.id);
    }
    
    return coolDowns;
  }
}

async function getCoolDownAgeGroups(db: D1Database, coolDownId: number): Promise<AgeGroup[]> {
  const { results } = await db.prepare(
    'SELECT ag.id, ag.name, ag.min_age as minAge, ag.max_age as maxAge, ' +
    'ag.water_break_frequency as waterBreakFrequency, ag.warm_up_duration as warmUpDuration, ' +
    'ag.cool_down_duration as coolDownDuration, ag.created_at as createdAt ' +
    'FROM age_groups ag ' +
    'JOIN cool_down_age_groups cag ON ag.id = cag.age_group_id ' +
    'WHERE cag.cool_down_id = ?'
  ).bind(coolDownId).all();
  
  return results as AgeGroup[];
}

// Drill functions
export async function getDrills(
  db: D1Database, 
  skillCategoryIds?: number[], 
  ageGroupId?: number
): Promise<Drill[]> {
  let query = 'SELECT DISTINCT d.id, d.name, d.objective, d.description, d.duration, ' +
              'd.difficulty, d.min_players as minPlayers, d.max_players as maxPlayers, ' +
              'd.equipment, d.image_url as imageUrl, d.video_url as videoUrl, ' +
              'd.created_at as createdAt FROM drills d';
  
  const params: any[] = [];
  
  if (skillCategoryIds?.length || ageGroupId) {
    query += ' LEFT JOIN drill_skill_categories dsc ON d.id = dsc.drill_id ' +
             'LEFT JOIN drill_age_groups dag ON d.id = dag.drill_id WHERE ';
    
    const conditions: string[] = [];
    
    if (skillCategoryIds?.length) {
      conditions.push(`dsc.skill_category_id IN (${skillCategoryIds.map(() => '?').join(', ')})`);
      params.push(...skillCategoryIds);
    }
    
    if (ageGroupId) {
      conditions.push('dag.age_group_id = ?');
      params.push(ageGroupId);
    }
    
    query += conditions.join(' AND ');
  }
  
  const statement = db.prepare(query);
  const { results } = params.length ? await statement.bind(...params).all() : await statement.all();
  const drills = results as Drill[];
  
  // Get skill categories and age groups for each drill
  for (const drill of drills) {
    drill.skillCategories = await getDrillSkillCategories(db, drill.id);
    drill.ageGroups = await getDrillAgeGroups(db, drill.id);
  }
  
  return drills;
}

export async function getDrillById(db: D1Database, id: number): Promise<Drill | null> {
  const result = await db.prepare(
    'SELECT id, name, objective, description, duration, difficulty, ' +
    'min_players as minPlayers, max_players as maxPlayers, equipment, ' +
    'image_url as imageUrl, video_url as videoUrl, created_at as createdAt ' +
    'FROM drills WHERE id = ?'
  ).bind(id).first();
  
  if (!result) return null;
  
  const drill = result as Drill;
  drill.skillCategories = await getDrillSkillCategories(db, drill.id);
  drill.ageGroups = await getDrillAgeGroups(db, drill.id);
  
  return drill;
}

async function getDrillSkillCategories(db: D1Database, drillId: number): Promise<SkillCategory[]> {
  const { results } = await db.prepare(
    'SELECT sc.id, sc.name, sc.description, sc.icon_url as iconUrl, sc.created_at as createdAt ' +
    'FROM skill_categories sc ' +
    'JOIN drill_skill_categories dsc ON sc.id = dsc.skill_category_id ' +
    'WHERE dsc.drill_id = ?'
  ).bind(drillId).all();
  
  return results as SkillCategory[];
}

async function getDrillAgeGroups(db: D1Database, drillId: number): Promise<AgeGroup[]> {
  const { results } = await db.prepare(
    'SELECT ag.id, ag.name, ag.min_age as minAge, ag.max_age as maxAge, ' +
    'ag.water_break_frequency as waterBreakFrequency, ag.warm_up_duration as warmUpDuration, ' +
    'ag.cool_down_duration as coolDownDuration, ag.created_at as createdAt ' +
    'FROM age_groups ag ' +
    'JOIN drill_age_groups dag ON ag.id = dag.age_group_id ' +
    'WHERE dag.drill_id = ?'
  ).bind(drillId).all();
  
  return results as AgeGroup[];
}

// Practice Plan functions
export async function createPracticePlan(
  db: D1Database,
  totalDuration: number,
  ageGroupId: number,
  skillCategoryIds: number[]
): Promise<number> {
  // Start a transaction
  await db.exec('BEGIN TRANSACTION');
  
  try {
    // Insert practice plan
    const result = await db.prepare(
      'INSERT INTO practice_plans (total_duration, age_group_id) VALUES (?, ?)'
    ).bind(totalDuration, ageGroupId).run();
    
    const practicePlanId = result.meta.last_row_id as number;
    
    // Insert skill focus relationships
    for (const skillCategoryId of skillCategoryIds) {
      await db.prepare(
        'INSERT INTO practice_plan_skills (practice_plan_id, skill_category_id) VALUES (?, ?)'
      ).bind(practicePlanId, skillCategoryId).run();
    }
    
    // Commit transaction
    await db.exec('COMMIT');
    
    return practicePlanId;
  } catch (error) {
    // Rollback transaction on error
    await db.exec('ROLLBACK');
    throw error;
  }
}

export async function getPracticePlanById(db: D1Database, id: number): Promise<PracticePlan | null> {
  // Get practice plan
  const planResult = await db.prepare(
    'SELECT p.id, p.total_duration as totalDuration, p.created_at as createdAt, ' +
    'a.id as ageGroupId, a.name as ageGroupName, a.min_age as ageGroupMinAge, ' +
    'a.max_age as ageGroupMaxAge, a.water_break_frequency as ageGroupWaterBreakFrequency, ' +
    'a.warm_up_duration as ageGroupWarmUpDuration, a.cool_down_duration as ageGroupCoolDownDuration, ' +
    'a.created_at as ageGroupCreatedAt ' +
    'FROM practice_plans p ' +
    'JOIN age_groups a ON p.age_group_id = a.id ' +
    'WHERE p.id = ?'
  ).bind(id).first();
  
  if (!planResult) return null;
  
  // Construct age group
  const ageGroup: AgeGroup = {
    id: (planResult as any).ageGroupId,
    name: (planResult as any).ageGroupName,
    minAge: (planResult as any).ageGroupMinAge,
    maxAge: (planResult as any).ageGroupMaxAge,
    waterBreakFrequency: (planResult as any).ageGroupWaterBreakFrequency,
    warmUpDuration: (planResult as any).ageGroupWarmUpDuration,
    coolDownDuration: (planResult as any).ageGroupCoolDownDuration,
    createdAt: (planResult as any).ageGroupCreatedAt
  };
  
  // Get skill focus
  const { results: skillResults } = await db.prepare(
    'SELECT sc.id, sc.name, sc.description, sc.icon_url as iconUrl, sc.created_at as createdAt ' +
    'FROM skill_categories sc ' +
    'JOIN practice_plan_skills pps ON sc.id = pps.skill_category_id ' +
    'WHERE pps.practice_plan_id = ?'
  ).bind(id).all();
  
  // Get practice sections
  const { results: sectionResults } = await db.prepare(
    'SELECT id, practice_plan_id as practicePlanId, section_type as sectionType, ' +
    'name, start_time as startTime, end_time as endTime, duration, ' +
    'details_id as detailsId, details_type as detailsType, sequence_order as sequenceOrder, ' +
    'created_at as createdAt ' +
    'FROM practice_sections ' +
    'WHERE practice_plan_id = ? ' +
    'ORDER BY sequence_order'
  ).bind(id).all();
  
  // Construct practice plan
  const practicePlan: PracticePlan = {
    id: (planResult as any).id,
    totalDuration: (planResult as any).totalDuration,
    ageGroup,
    skillFocus: skillResults as SkillCategory[],
    sections: sectionResults as PracticeSection[],
    createdAt: (planResult as any).createdAt
  };
  
  return practicePlan;
}

export async function addPracticeSection(
  db: D1Database,
  practicePlanId: number,
  sectionType: SectionType,
  name: string,
  startTime: string,
  endTime: string,
  duration: number,
  detailsId?: number,
  detailsType?: string,
  sequenceOrder?: number
): Promise<number> {
  // If sequence order is not provided, get the next available one
  if (!sequenceOrder) {
    const result = await db.prepare(
      'SELECT COALESCE(MAX(sequence_order), 0) + 1 as nextOrder ' +
      'FROM practice_sections WHERE practice_plan_id = ?'
    ).bind(practicePlanId).first();
    
    sequenceOrder = (result as any).nextOrder;
  }
  
  // Insert practice section
  const result = await db.prepare(
    'INSERT INTO practice_sections ' +
    '(practice_plan_id, section_type, name, start_time, end_time, duration, details_id, details_type, sequence_order) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(
    practicePlanId,
    sectionType,
    name,
    startTime,
    endTime,
    duration,
    detailsId || null,
    detailsType || null,
    sequenceOrder
  ).run();
  
  return result.meta.last_row_id as number;
}
