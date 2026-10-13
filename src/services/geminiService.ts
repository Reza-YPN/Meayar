import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: "DUMMY_KEY" }); // Only for mock purposes in client, since it's a demo
  }
  return ai;
};

export const createChatSession = () => {
  const genAI = getAI();
  return genAI.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: "شما یک متخصص منابع انسانی (HR) هستید که در طراحی ماتریس شایستگی‌ها تجربه دارید.",
    }
  });
};

export const analyzeCompetencyMatrix = async (snapshot: string) => {
  const genAI = getAI();
  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      { role: "user", parts: [{ text: `این ماتریس شایستگی را تحلیل کن و یک بازخورد مدیریتی کوتاه و ساختاریافته ارائه بده:\n${snapshot}` }] }
    ]
  });
  return response.text;
};
