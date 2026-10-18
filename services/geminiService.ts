
import { GoogleGenAI, Type } from "@google/genai";

// Fixed: Corrected GoogleGenAI initialization to use named parameter and direct process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMakeupAdvice = async (userDescription: string, photoBase64?: string) => {
  try {
    const model = 'gemini-3-flash-preview';
    const contents = photoBase64 
      ? {
          parts: [
            { text: `Analyze this person's facial features and suggest the best makeup style for a ${userDescription}. Be encouraging and professional as a luxury salon consultant.` },
            { inlineData: { mimeType: 'image/jpeg', data: photoBase64 } }
          ]
        }
      : `Suggest a luxury makeup style for a client looking for: ${userDescription}. Mention specific techniques like contouring or eye shadow shades.`;

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: "You are Aneela, a world-class luxury makeup artist and consultant for 'Aneelas MakeOver'. Your tone is premium, warm, and highly professional. You focus on perfection and 'every stroke' being intentional.",
      }
    });

    return response.text || "I'm having trouble seeing your beauty clearly right now. Let's try again in a moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The beauty consultant is currently busy. Please try again shortly.";
  }
};

export const parseVoiceCommand = async (transcript: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The user said: "${transcript}". Identify if they want to book a service, see the academy, or view the gallery. Return a simple JSON with 'intent' and 'params'.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            intent: { type: Type.STRING, description: 'One of: BOOK_SERVICE, VIEW_ACADEMY, VIEW_GALLERY, HELP' },
            serviceType: { type: Type.STRING, description: 'The service name if applicable' }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return { intent: 'HELP' };
  }
};
