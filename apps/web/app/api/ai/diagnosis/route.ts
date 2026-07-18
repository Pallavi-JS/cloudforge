import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const { log } = await request.json();

    if (!log || typeof log !== "string") {
      return NextResponse.json(
        { error: "Error log is required" },
        { status: 400 }
      );
    }

    const prompt = `
You are CloudForge AI Error Diagnosis Agent.

Analyze the following software or cloud infrastructure error log:

${log}

Provide your response in this exact structure:

ERROR SUMMARY:
Explain the main problem in simple terms.

ROOT CAUSE:
Explain the most likely technical cause.

SEVERITY:
Choose one: LOW, MEDIUM, HIGH, or CRITICAL.

RECOMMENDED SOLUTION:
Give clear steps to fix the issue.

PREVENTION:
Explain how to prevent this issue in the future.

Important:
- Analyze only the information provided.
- Do not invent specific facts.
- If the information is insufficient, clearly say what additional information is needed.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });

    return NextResponse.json({
      success: true,
      diagnosis: response.text,
    });
  } catch (error) {
    console.error("AI Diagnosis Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "AI error diagnosis failed",
      },
      { status: 500 }
    );
  }
}