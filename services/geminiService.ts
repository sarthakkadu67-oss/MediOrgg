import { GoogleGenAI } from "@google/genai";
import { ActivityType } from "../types";

// Use import.meta.env for Vite, fallback to process.env if needed
const apiKey = import.meta.env.VITE_API_KEY || '';

// Initialize only if key exists, otherwise we handle gracefully in UI
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getHealthInsight = async (
  stats: Record<ActivityType, number>
): Promise<string> => {
  if (!ai) {
    return "AI insights are unavailable (Missing API Key).";
  }

  try {
    const prompt = `
      I am tracking my health. Today I have achieved:
      - Water: ${stats[ActivityType.WATER]} glasses
      - Steps: ${stats[ActivityType.STEPS]} steps
      - Sleep: ${stats[ActivityType.SLEEP]} hours
      
      Provide a single, short (max 20 words), encouraging, and specific health tip or observation based on these numbers. 
      Use a friendly, motivational tone.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error fetching Gemini insight:", error);
    return "Great job tracking your health today! Keep it up!";
  }
};