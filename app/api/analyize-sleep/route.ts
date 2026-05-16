import { analyzeSleep } from "@/app/actions/analyzeSleep";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();
      console.log("Received data for analysis:", formData);
    const result = await analyzeSleep(formData.data);
    console.log("result from route=>", result)
    revalidatePath("/ai-analysis");
    return NextResponse.json(result);
  } catch (error) {
    console.error("API ERROR:", error);
  return NextResponse.json(
    { error: String(error) },
    { status: 500 }
  );
  }
}