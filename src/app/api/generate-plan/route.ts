import { NextResponse } from 'next/server'
import { generatePracticePlan } from '@/lib/db/practice-generator'
import { PracticePlanFormInput } from '@/lib/db/models'

export async function POST(req: Request) {
  const data: PracticePlanFormInput = await req.json()

  if (
    !data.ageGroupId ||
    !data.skillCategoryIds?.length ||
    !data.practiceLength
  ) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const plan = await generatePracticePlan(
    data.ageGroupId,
    data.skillCategoryIds,
    data.practiceLength,
    [] // empty drill array for now
  )

  return NextResponse.json(plan)
}
