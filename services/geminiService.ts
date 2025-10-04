import { GoogleGenAI } from "@google/genai";
import { BusinessCardData } from "../types";

// Per guidelines, API key must come from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateSummary = async (data: Partial<BusinessCardData>): Promise<string> => {
  if (!data.name || !data.title || !data.company) {
    throw new Error("Name, title, and company are required to generate a summary.");
  }
  
  const prompt = `Generate a short, professional summary (under 25 words) for a business card. Details:
  - Name: ${data.name}
  - Title: ${data.title}
  - Company: ${data.company}
  - Existing summary (for context, if any): ${data.summary || 'N/A'}`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating summary with Gemini:", error);
    throw new Error("Failed to generate summary. Please try again later.");
  }
};