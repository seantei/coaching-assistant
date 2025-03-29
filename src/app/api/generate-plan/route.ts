// API route for generating practice plans
import { NextRequest } from 'next/server'
import { D1Database } from '@cloudflare/workers-types'
import { 
  getAgeGroupById, 
  getSkillCategoryById, 
  getDrills, 
  getWarmUps, 
  getCoolDowns,
  createPracticePlan,
  addPracticeSection
} from '@/lib/db/database'
import { generatePracticePlan } from '@/lib/practice-generator'
import { PracticePlanFormInput } from '@/lib/db/models'

export async function POST(request: NextRequest) {
  try {
    const db = (request.env as any).DB as D1Database
    const data = await request.json() as PracticePlanFormInput
    
    // Validate input
    if (!data.duration || !data.ageGroupId || !data.skillCategoryIds || data.skillCategoryIds.length === 0) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Get age group
    const ageGroup = await getAgeGroupById(db, data.ageGroupId)
    if (!ageGroup) {
      return Response.json({ error: 'Age group not found' }, { status: 404 })
    }
    
    // Get skill categories
    const skillCategories = []
    for (const skillCategoryId of data.skillCategoryIds) {
      const skillCategory = await getSkillCategoryById(db, skillCategoryId)
      if (skillCategory) {
        skillCategories.push(skillCategory)
      }
    }
    
    if (skillCategories.length === 0) {
      return Response.json({ error: 'No valid skill categories found' }, { status: 404 })
    }
    
    // Get available drills, warm-ups, and cool-downs
    const availableDrills = await getDrills(db, data.skillCategoryIds, data.ageGroupId)
    const availableWarmUps = await getWarmUps(db, data.ageGroupId)
    const availableCoolDowns = await getCoolDowns(db, data.ageGroupId)
    
    // Generate practice plan
    const practicePlan = generatePracticePlan({
      duration: data.duration,
      ageGroup,
      skillCategories,
      availableDrills,
      availableWarmUps,
      availableCoolDowns
    })
    
    // Save practice plan to database
    const practicePlanId = await createPracticePlan(
      db,
      practicePlan.totalDuration,
      practicePlan.ageGroup.id,
      practicePlan.skillFocus.map(sc => sc.id)
    )
    
    // Save practice sections
    for (const section of practicePlan.sections) {
      await addPracticeSection(
        db,
        practicePlanId,
        section.sectionType,
        section.name,
        section.startTime,
        section.endTime,
        section.duration,
        section.detailsId,
        section.detailsType,
        section.sequenceOrder
      )
    }
    
    // Update practice plan ID
    practicePlan.id = practicePlanId
    
    return Response.json({ practicePlan })
  } catch (error) {
    console.error('Error generating practice plan:', error)
    return Response.json({ error: 'Failed to generate practice plan' }, { status: 500 })
  }
}
