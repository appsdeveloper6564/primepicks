import { GoogleGenAI } from "@google/genai";
import { Product, ImageSize } from '../types';

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

// Helper to handle API Key selection for paid features
async function ensureApiKey() {
  if (window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await window.aistudio.openSelectKey();
    }
  }
}

// Helper to get AI instance (creates new one to pick up updated key)
function getAI() {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export async function searchProductsWithGrounding(query: string): Promise<Product[]> {
  const ai = getAI();
  
  const prompt = `
    Search for "${query}".
    Based on the search results, provide a list of 4 to 8 distinct recommended products.
    
    Return the results ONLY as a raw JSON array (no markdown formatting, no code blocks).
    Each object in the array must match this structure:
    {
      "id": "unique_string_id",
      "title": "Product Name",
      "image": "https://picsum.photos/400/400?random=X" (Use this exact format with a random number for X),
      "description": "A short description based on search results",
      "features": ["Feature 1", "Feature 2", "Feature 3"],
      "price": "Price in INR (e.g. ₹9,999)",
      "rating": "Rating (e.g. 4.5/5)",
      "affiliate_link": "https://amazon.in/..." (or "#" if not found)
    }
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
    }
  });

  const text = response.text || '[]';
  
  try {
    // Clean up potential markdown code blocks if the model ignores "no markdown"
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const products = JSON.parse(cleanText) as Product[];
    
    // Ensure IDs are unique strings if the model messed up
    return products.map((p, i) => ({
      ...p,
      id: p.id || `gen_p_${i}_${Date.now()}`
    }));
  } catch (e) {
    console.error("Failed to parse search results:", e);
    return [];
  }
}

export async function getExpertBuyingAdvice(query: string): Promise<string> {
  const ai = getAI();
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: query,
    config: {
      thinkingConfig: { thinkingBudget: 16000 },
    }
  });

  return response.text || "I couldn't generate advice at this time.";
}

export async function generateProductConcept(prompt: string, size: ImageSize): Promise<string | null> {
  await ensureApiKey();
  const ai = getAI();

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: '1:1',
          imageSize: size
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData && part.inlineData.data) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
    }
    return null;
  } catch (e) {
    console.error("Image generation failed", e);
    return null;
  }
}