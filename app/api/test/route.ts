import { model } from "@/lib/gemini";

export async function GET() {

  const result = await model.generateContent(
    "Say hello"
  );

  console.log("test result ==>", result)

  return Response.json({
    text: result.response.text(),
  });
}
