"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";


// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export type SleepAnalysisResult = {
  sleepScore: number;
  summary: string;
  detectedIssues: string[];
  recommendations: string[];
};

export async function analyzeSleep(data: any): Promise<SleepAnalysisResult | null> {
  const { userId: clerkId } = await auth();
  console.log("USER ID:", clerkId);
  if (!clerkId) return null;

  if (!data || data.length === 0) {
    return null
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: clerkId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Say hello",
  }

  );

  console.log("test ai =>", result);

  const prompt = `
You are a professional sleep analyst.

Analyze the user's sleep pattern based on ALL records:



${JSON.stringify(data)}

Focus on:
- trends
- patterns
- long-term issues
- improvements

Return JSON:
{
  "sleepScore": number,
  "summary": string,
  "detectedIssues": string[],
  "recommendations": string[]
}
`;


  try {
    const completion = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    const text = completion.text;

    const cleaned = text?.replace(/```json|```/g, "").trim() || "";

    const parsed = JSON.parse(cleaned);

    await db.sleepAnalysis.upsert({
      where: {
        userId: user.id,
      },
      update: {
        sleepScore: parsed.sleepScore,
        summary: parsed.summary,
        detectedIssues: parsed.detectedIssues,
        recommendations: parsed.recommendations,
      },
      create: {
        userId: user.id,
        sleepScore: parsed.sleepScore,
        summary: parsed.summary,
        detectedIssues: parsed.detectedIssues,
        recommendations: parsed.recommendations,
      },
    });


    return parsed;
  } catch (error: any) {

    if (error.status === 429) {
      return {
        sleepScore: 0,
        summary: "AI temporarily unavailable. Please try later.",
        detectedIssues: [],
        recommendations: ["Try again later"],
      };
    }

    throw error;
  }

}

// const all = await db.record.findMany();
// console.log("ALL RECORDS:", all);

// const allusers = await db.record.findMany();
// console.log("all users==>")
// console.log(allusers.map(r => r.userId));