import { NextResponse } from "next/server";
import { generatePracticePlan } from "@/lib/db/practice-generator";
import { PracticePlanFormInput } from "@/lib/db/models";

export async function POST(req: Request) {
  try {
    const data: PracticePlanFormInput = await req.json();

    // ✅ Match argument order and types for generatePracticePlan
    const plan = await generatePracticePlan(
      data.ageGroupId,
      data.skillCategoryIds,
      data.practiceLength,
      [] // pass empty array of drills
    );

    return NextResponse.json(plan);
  } catch (error) {
    console.error("Error generating practice plan:", error);
    return NextResponse.json({ error: "Failed to generate practice plan" }, { status: 500 });
  }
}
