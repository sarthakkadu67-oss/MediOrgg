import { GoogleGenAI } from "@google/genai";
import { ActivityType } from "../types";

// Helper to safely get env vars in both Vite and Expo environments
const getApiKey = () => {
  // Vite (Web)
  try {
    // @ts-ignore
    const meta = import.meta as any;
    if (meta && meta.env) {
      return meta.env.VITE_API_KEY;
    }
  } catch (e) {
    // Ignore error if import.meta is accessed incorrectly in some environments
  }

  // React Native / Expo
  if (typeof process !== 'undefined' && process.env) {
    return process.env.EXPO_PUBLIC_API_KEY || process.env.API_KEY;
  }
  return '';
};

const apiKey = getApiKey();

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

    const text = response.text;
    return text ? text.trim() : "Keep moving forward!";
  } catch (error) {
    console.error("Error fetching Gemini insight:", error);
    return "Great job tracking your health today! Keep it up!";
  }
};
