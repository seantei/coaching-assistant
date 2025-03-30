import { NextResponse } from "next/server";
import { generatePracticePlan } from "@/lib/db/practice-generator";
import { PracticePlanFormInput } from "@/lib/db/models";

export async function POST(req: Request) {
  try {
    const data: PracticePlanFormInput = await req.json();

    // ✅ Pass arguments as expected: drills, ageGroupId, skillCategoryIds, practiceLength
    const plan = await generatePracticePlan(
      [], // empty array for drills
      data.ageGroupId,
      data.skillCategoryIds,
      data.practiceLength
    );

    return NextResponse.json(plan);
  } catch (error) {
    console.error("Error generating practice plan:", error);
    return NextResponse.json({ error: "Failed to generate practice plan" }, { status: 500 });
  }
}
