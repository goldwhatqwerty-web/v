
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGeminiHint = async (question: string, correctAnswer: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a romantic "Love Fairy" assisting a beautiful girl in guessing a memory she shares with her "Wizard" (Spidey).
      
      Question: "${question}"
      The Secret Answer: "${correctAnswer}"
      
      Task: Give a very sweet, lovely, and poetic hint that triggers her memory without giving away the exact word. 
      Use a warm, caring tone. Mention "lovely" things where appropriate.
      Keep it brief (max 12 words).`,
    });
    return response.text || "Think of our lovely moments together, princess...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "It's a lovely memory hidden in your heart...";
  }
};
