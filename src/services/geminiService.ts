// FIX: Added Content and GenerateContentResponse for typing the chat history and API response.
import { GoogleGenAI, Content, GenerateContentResponse } from "@google/genai";
import { Product } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

// FIX: Implemented and exported the missing askGeminiAboutProduct function.
export const askGeminiAboutProduct = async (product: Product, history: Content[]): Promise<string> => {
    const model = 'gemini-2.5-flash';

    const productInfo = `Product Name: ${product.name}
Description: ${stripHtml(product.description)}
Pack Sizes and Prices: ${product.packSizes.map(p => `${p.weight} for ₹${p.price}`).join(', ')}
Approximate Ladoos per 500g (if applicable): ${product.approxLadoos}
`;

    const systemInstruction = `You are a friendly and helpful customer support assistant for "Bengali Bites", an online store selling authentic Bengali sweets and snacks. Your goal is to answer customer questions about the products accurately and concisely. Use the provided product information to answer. Do not make up information. If you don't know the answer, say you need to check with the team. Keep your answers brief.
    
Here is the product information for the current conversation:
${productInfo}
`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: model,
            contents: history,
            config: {
                systemInstruction: systemInstruction,
            },
        });

        return response.text;
    } catch (e) {
        console.error("Error calling Gemini API:", e);
        return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
    }
};
