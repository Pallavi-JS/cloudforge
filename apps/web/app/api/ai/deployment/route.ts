import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const { servers } = await request.json();

    if (!Array.isArray(servers) || servers.length === 0) {
      return NextResponse.json(
        { error: "No servers provided" },
        { status: 400 }
      );
    }

    const prompt = `
You are the AI Deployment Agent of CloudForge.

Analyze these servers and recommend the best server for deployment.

Server data:
${JSON.stringify(servers, null, 2)}

Consider:
- Health score
- CPU usage
- Memory usage
- Response time

Return a concise recommendation explaining:
1. Which server should be selected
2. Why it is the best choice
3. Any risk or concern

Do not invent data that is not provided.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });

    return NextResponse.json({
      success: true,
      analysis: response.text,
    });
  } catch (error) {
    console.error("AI Deployment Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "AI deployment analysis failed",
      },
      { status: 500 }
    );
  }
}