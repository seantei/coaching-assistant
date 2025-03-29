// This file adapts the database connection for Vercel PostgreSQL
// Create this file when deploying to Vercel

import { Pool } from 'pg';
import { 
  AgeGroup, 
  SkillCategory, 
  WarmUp, 
  CoolDown, 
  Drill, 
  PracticePlan,
  PracticeSection
} from './models';

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Age Group functions
export async function getAgeGroups(): Promise<AgeGroup[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, name, min_age as "minAge", max_age as "maxAge", ' +
      'water_break_frequency as "waterBreakFrequency", warm_up_duration as "warmUpDuration", ' +
      'cool_down_duration as "coolDownDuration", created_at as "createdAt" ' +
      'FROM age_groups ORDER BY min_age'
    );
    
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getAgeGroupById(id: number): Promise<AgeGroup | null> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, name, min_age as "minAge", max_age as "maxAge", ' +
      'water_break_frequency as "waterBreakFrequency", warm_up_duration as "warmUpDuration", ' +
      'cool_down_duration as "coolDownDuration", created_at as "createdAt" ' +
      'FROM age_groups WHERE id = $1',
      [id]
    );
    
    return result.rows.length > 0 ? result.rows[0] : null;
  } finally {
    client.release();
  }
}

// Skill Category functions
export async function getSkillCategories(): Promise<SkillCategory[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, name, description, icon_url as "iconUrl", created_at as "createdAt" ' +
      'FROM skill_categories ORDER BY name'
    );
    
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getSkillCategoryById(id: number): Promise<SkillCategory | null> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, name, description, icon_url as "iconUrl", created_at as "createdAt" ' +
      'FROM skill_categories WHERE id = $1',
      [id]
    );
    
    return result.rows.length > 0 ? result.rows[0] : null;
  } finally {
    client.release();
  }
}

// Warm-up functions
export async function getWarmUps(ageGroupId?: number): Promise<WarmUp[]> {
  const client = await pool.connect();
  try {
    let query = 'SELECT w.id, w.name, w.description, w.duration, w.equipment, ' +
                'w.image_url as "imageUrl", w.created_at as "createdAt" ' +
                'FROM warm_ups w';
    
    let params = [];
    
    if (ageGroupId) {
      query += ' JOIN warm_up_age_groups wag ON w.id = wag.warm_up_id ' +
               'WHERE wag.age_group_id = $1';
      params.push(ageGroupId);
    }
    
    const result = await client.query(query, params);
    const warmUps = result.rows;
    
    // Get age groups for each warm-up
    for (const warmUp of warmUps) {
      warmUp.ageGroups = await getWarmUpAgeGroups(warmUp.id);
    }
    
    return warmUps;
  } finally {
    client.release();
  }
}

async function getWarmUpAgeGroups(warmUpId: number): Promise<AgeGroup[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT ag.id, ag.name, ag.min_age as "minAge", ag.max_age as "maxAge", ' +
      'ag.water_break_frequency as "waterBreakFrequency", ag.warm_up_duration as "warmUpDuration", ' +
      'ag.cool_down_duration as "coolDownDuration", ag.created_at as "createdAt" ' +
      'FROM age_groups ag ' +
      'JOIN warm_up_age_groups wag ON ag.id = wag.age_group_id ' +
      'WHERE wag.warm_up_id = $1',
      [warmUpId]
    );
    
    return result.rows;
  } finally {
    client.release();
  }
}

// Cool-down functions
export async function getCoolDowns(ageGroupId?: number): Promise<CoolDown[]> {
  const client = await pool.connect();
  try {
    let query = 'SELECT c.id, c.name, c.description, c.duration, c.equipment, ' +
                'c.image_url as "imageUrl", c.created_at as "createdAt" ' +
                'FROM cool_downs c';
    
    let params = [];
    
    if (ageGroupId) {
      query += ' JOIN cool_down_age_groups cag ON c.id = cag.cool_down_id ' +
               'WHERE cag.age_group_id = $1';
      params.push(ageGroupId);
    }
    
    const result = await client.query(query, params);
    const coolDowns = result.rows;
    
    // Get age groups for each cool-down
    for (const coolDown of coolDowns) {
      coolDown.ageGroups = await getCoolDownAgeGroups(coolDown.id);
    }
    
    return coolDowns;
  } finally {
    client.release();
  }
}

async function getCoolDownAgeGroups(coolDownId: number): Promise<AgeGroup[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT ag.id, ag.name, ag.min_age as "minAge", ag.max_age as "maxAge", ' +
      'ag.water_break_frequency as "waterBreakFrequency", ag.warm_up_duration as "warmUpDuration", ' +
      'ag.cool_down_duration as "coolDownDuration", ag.created_at as "createdAt" ' +
      'FROM age_groups ag ' +
      'JOIN cool_down_age_groups cag ON ag.id = cag.age_group_id ' +
      'WHERE cag.cool_down_id = $1',
      [coolDownId]
    );
    
    return result.rows;
  } finally {
    client.release();
  }
}

// Drill functions
export async function getDrills(
  skillCategoryIds?: number[], 
  ageGroupId?: number
): Promise<Drill[]> {
  const client = await pool.connect();
  try {
    let query = 'SELECT DISTINCT d.id, d.name, d.objective, d.description, d.duration, ' +
                'd.difficulty, d.min_players as "minPlayers", d.max_players as "maxPlayers", ' +
                'd.equipment, d.image_url as "imageUrl", d.video_url as "videoUrl", ' +
                'd.created_at as "createdAt" FROM drills d';
    
    const params: any[] = [];
    
    if (skillCategoryIds?.length || ageGroupId) {
      query += ' LEFT JOIN drill_skill_categories dsc ON d.id = dsc.drill_id ' +
               'LEFT JOIN drill_age_groups dag ON d.id = dag.drill_id WHERE ';
      
      const conditions: string[] = [];
      
      if (skillCategoryIds?.length) {
        const placeholders = skillCategoryIds.map((_, i) => `$${i + 1}`).join(', ');
        conditions.push(`dsc.skill_category_id IN (${placeholders})`);
        params.push(...skillCategoryIds);
      }
      
      if (ageGroupId) {
        conditions.push(`dag.age_group_id = $${params.length + 1}`);
        params.push(ageGroupId);
      }
      
      query += conditions.join(' AND ');
    }
    
    const result = await client.query(query, params);
    const drills = result.rows;
    
    // Get skill categories and age groups for each drill
    for (const drill of drills) {
      drill.skillCategories = await getDrillSkillCategories(drill.id);
      drill.ageGroups = await getDrillAgeGroups(drill.id);
    }
    
    return drills;
  } finally {
    client.release();
  }
}

export async function getDrillById(id: number): Promise<Drill | null> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, name, objective, description, duration, difficulty, ' +
      'min_players as "minPlayers", max_players as "maxPlayers", equipment, ' +
      'image_url as "imageUrl", video_url as "videoUrl", created_at as "createdAt" ' +
      'FROM drills WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) return null;
    
    const drill = result.rows[0];
    drill.skillCategories = await getDrillSkillCategories(drill.id);
    drill.ageGroups = await getDrillAgeGroups(drill.id);
    
    return drill;
  } finally {
    client.release();
  }
}

async function getDrillSkillCategories(drillId: number): Promise<SkillCategory[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT sc.id, sc.name, sc.description, sc.icon_url as "iconUrl", sc.created_at as "createdAt" ' +
      'FROM skill_categories sc ' +
      'JOIN drill_skill_categories dsc ON sc.id = dsc.skill_category_id ' +
      'WHERE dsc.drill_id = $1',
      [drillId]
    );
    
    return result.rows;
  } finally {
    client.release();
  }
}

async function getDrillAgeGroups(drillId: number): Promise<AgeGroup[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT ag.id, ag.name, ag.min_age as "minAge", ag.max_age as "maxAge", ' +
      'ag.water_break_frequency as "waterBreakFrequency", ag.warm_up_duration as "warmUpDuration", ' +
      'ag.cool_down_duration as "coolDownDuration", ag.created_at as "createdAt" ' +
      'FROM age_groups ag ' +
      'JOIN drill_age_groups dag ON ag.id = dag.age_group_id ' +
      'WHERE dag.drill_id = $1',
      [drillId]
    );
    
    return result.rows;
  } finally {
    client.release();
  }
}

// Practice Plan functions
export async function createPracticePlan(
  totalDuration: number,
  ageGroupId: number,
  skillCategoryIds: number[]
): Promise<number> {
  const client = await pool.connect();
  try {
    // Start a transaction
    await client.query('BEGIN');
    
    // Insert practice plan
    const planResult = await client.query(
      'INSERT INTO practice_plans (total_duration, age_group_id) VALUES ($1, $2) RETURNING id',
      [totalDuration, ageGroupId]
    );
    
    const practicePlanId = planResult.rows[0].id;
    
    // Insert skill focus relationships
    for (const skillCategoryId of skillCategoryIds) {
      await client.query(
        'INSERT INTO practice_plan_skills (practice_plan_id, skill_category_id) VALUES ($1, $2)',
        [practicePlanId, skillCategoryId]
      );
    }
    
    // Commit transaction
    await client.query('COMMIT');
    
    return practicePlanId;
  } catch (error) {
    // Rollback transaction on error
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function getPracticePlanById(id: number): Promise<PracticePlan | null> {
  const client = await pool.connect();
  try {
    // Get practice plan
    const planResult = await client.query(
      'SELECT p.id, p.total_duration as "totalDuration", p.created_at as "createdAt", ' +
      'a.id as "ageGroupId", a.name as "ageGroupName", a.min_age as "ageGroupMinAge", ' +
      'a.max_age as "ageGroupMaxAge", a.water_break_frequency as "ageGroupWaterBreakFrequency", ' +
      'a.warm_up_duration as "ageGroupWarmUpDuration", a.cool_down_duration as "ageGroupCoolDownDuration", ' +
      'a.created_at as "ageGroupCreatedAt" ' +
      'FROM practice_plans p ' +
      'JOIN age_groups a ON p.age_group_id = a.id ' +
      'WHERE p.id = $1',
      [id]
    );
    
    if (planResult.rows.length === 0) return null;
    
    // Construct age group
    const ageGroup: AgeGroup = {
      id: planResult.rows[0].ageGroupId,
      name: planResult.rows[0].ageGroupName,
      minAge: planResult.rows[0].ageGroupMinAge,
      maxAge: planResult.rows[0].ageGroupMaxAge,
      waterBreakFrequency: planResult.rows[0].ageGroupWaterBreakFrequency,
      warmUpDuration: planResult.rows[0].ageGroupWarmUpDuration,
      coolDownDuration: planResult.rows[0].ageGroupCoolDownDuration,
      createdAt: planResult.rows[0].ageGroupCreatedAt
    };
    
    // Get skill focus
    const skillResult = await client.query(
      'SELECT sc.id, sc.name, sc.description, sc.icon_url as "iconUrl", sc.created_at as "createdAt" ' +
      'FROM skill_categories sc ' +
      'JOIN practice_plan_skills pps ON sc.id = pps.skill_category_id ' +
      'WHERE pps.practice_plan_id = $1',
      [id]
    );
    
    // Get practice sections
    const sectionResult = await client.query(
      'SELECT id, practice_plan_id as "practicePlanId", section_type as "sectionType", ' +
      'name, start_time as "startTime", end_time as "endTime", duration, ' +
      'details_id as "detailsId", details_type as "detailsType", sequence_order as "sequenceOrder", ' +
      'created_at as "createdAt" ' +
      'FROM practice_sections ' +
      'WHERE practice_plan_id = $1 ' +
      'ORDER BY sequence_order',
      [id]
    );
    
    // Construct practice plan
    const practicePlan: PracticePlan = {
      id: planResult.rows[0].id,
      totalDuration: planResult.rows[0].totalDuration,
      ageGroup,
      skillFocus: skillResult.rows,
      sections: sectionResult.rows,
      createdAt: planResult.rows[0].createdAt
    };
    
    return practicePlan;
  } finally {
    client.release();
  }
}

export async function addPracticeSection(
  practicePlanId: number,
  sectionType: string,
  name: string,
  startTime: string,
  endTime: string,
  duration: number,
  detailsId?: number,
  detailsType?: string,
  sequenceOrder?: number
): Promise<number> {
  const client = await pool.connect();
  try {
    // If sequence order is not provided, get the next available one
    if (!sequenceOrder) {
      const orderResult = await client.query(
        'SELECT COALESCE(MAX(sequence_order), 0) + 1 as "nextOrder" ' +
        'FROM practice_sections WHERE practice_plan_id = $1',
        [practicePlanId]
      );
      
      sequenceOrder = orderResult.rows[0].nextOrder;
    }
    
    // Insert practice section
    const result = await client.query(
      'INSERT INTO practice_sections ' +
      '(practice_plan_id, section_type, name, start_time, end_time, duration, details_id, details_type, sequence_order) ' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      [
        practicePlanId,
        sectionType,
        name,
        startTime,
        endTime,
        duration,
        detailsId || null,
        detailsType || null,
        sequenceOrder
      ]
    );
    
    return result.rows[0].id;
  } finally {
    client.release();
  }
}
