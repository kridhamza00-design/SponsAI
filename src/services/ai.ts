import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ADNProfile {
  vision: string;
  audience: string[];
  goals: string[];
}

export interface SponsorStrategy {
  targetSectors: string[];
  brandVoice: string;
  minReach: number;
}

export const getCompatibilityScore = async (
  eventDNA: ADNProfile,
  sponsorStrategy: SponsorStrategy
) => {
  const prompt = `
    Analyse la compatibilité entre l'ADN d'un événement et la stratégie d'un sponsor.
    
    ADN Événement:
    Vision: ${eventDNA.vision}
    Audience: ${eventDNA.audience.join(", ")}
    Objectifs: ${eventDNA.goals.join(", ")}
    
    Stratégie Sponsor:
    Secteurs Cibles: ${sponsorStrategy.targetSectors.join(", ")}
    Brand Voice: ${sponsorStrategy.brandVoice}
    Reach Minimum: ${sponsorStrategy.minReach}
    
    Donne un score de compatibilité entre 0 et 100 et une explication JSON concise avec les clés:
    "score" (nombre), "explanation" (texte court), "risks" (liste de textes), "opportunities" (liste de textes).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Erreur scoring IA:", error);
    return { score: 0, explanation: "Erreur de calcul", risks: [], opportunities: [] };
  }
};
