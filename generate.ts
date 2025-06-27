import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";
import type { GeneratedContent, Tone } from '../src/types';

// This function is the serverless entry point.
export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const { productInfo, tone } = request.body;

  if (!productInfo || !tone) {
    return response.status(400).json({ error: 'Missing productInfo or tone in request body' });
  }

  if (!process.env.API_KEY) {
    return response.status(500).json({ error: 'API_KEY environment variable is not set on the server.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const fullContent = await generateGumroadProfile(ai, productInfo, tone);
    return response.status(200).json(fullContent);
  } catch (error) {
    console.error("Error in serverless function:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown internal error occurred.';
    return response.status(500).json({ error: 'Failed to generate content from AI.', details: errorMessage });
  }
}


// --- All the logic from geminiService.ts is now here, running on the server ---

const generateJsonPrompt = (productInfo: string, tone: Tone): string => {
  return `
You are a world-class Marketing Specialist and Visual Design Consultant specializing in E-commerce Optimization for the Gumroad platform.

**Adopt a ${tone} tone for all written content.**

Based on the user's product description below, generate a comprehensive and optimized Gumroad profile strategy.

User's Product Description: "${productInfo}"

Your response MUST be a valid JSON object. Do not include any text outside of the JSON object. The JSON object must have the exact following structure:

{
  "profileOverview": {
    "title": "Profile Overview",
    "tagline": "A short, catchy tagline (under 10 words) that summarizes the core value proposition. Perfect for the profile headline.",
    "variations": [
      "Variation 1: A compelling overview paragraph for the Gumroad bio. This version should be direct and benefit-driven, defining the brand, its value, and target audience.",
      "Variation 2: A second overview paragraph. This version can be slightly more creative or story-focused, while still being professional and clear."
    ]
  },
  "visuals": {
    "title": "Visuals & Branding Strategy",
    "colorPalette": {
        "primary": { "name": "Primary Color Name", "hex": "#RRGGBB", "meaning": "Psychological meaning of the primary color." },
        "secondary": { "name": "Secondary Color Name", "hex": "#RRGGBB", "meaning": "Psychological meaning of the secondary color." },
        "accent": { "name": "Accent Color Name", "hex": "#RRGGBB", "meaning": "Psychological meaning of the accent color." }
    },
    "typography": {
        "headingFont": { "name": "Font Name (e.g., 'Inter')", "style": "e.g., 'Bold', 'Semibold'", "size": "e.g., '24-32px'" },
        "bodyFont": { "name": "Font Name (e.g., 'Roboto')", "style": "e.g., 'Regular'", "size": "e.g., '16px'" },
        "pairingJustification": "Brief explanation of why these fonts work well together for the brand."
    },
    "iconsAndImagery": {
        "iconStyle": "Recommended icon style (e.g., 'Minimalist Line Icons', 'Solid Glyphs').",
        "iconSetExample": "Suggest a popular icon library that fits the style (e.g., 'Feather Icons', 'Font Awesome').",
        "imageryGuidance": "Guidance on the type of photos or illustrations to use (e.g., 'Use authentic user-generated content', 'Abstract gradients')."
    },
    "layoutAndSpacing": {
        "layoutSystem": "Suggest a layout system (e.g., '8-point grid system', 'Column-based layout').",
        "spacingGuidance": "Provide a best practice for spacing to ensure a clean UI."
    },
    "brandVoice": {
        "toneDescription": "Describe the brand voice based on the selected tone and product.",
        "messagingTip": "Provide a tip for creating consistent messaging."
    },
    "userEngagement": {
        "animationSuggestion": "Suggest a subtle animation or transition to enhance user experience (e.g., 'Use fade-in on scroll for sections').",
        "feedbackSuggestion": "Suggest a user feedback mechanism (e.g., 'Add a subtle button click animation')."
    }
  },
  "productDescriptionTemplate": {
    "title": "Product Description Template",
    "template": [
      { "heading": "Catchy Headline", "body": "Start with a headline that grabs attention and clearly states the product's main benefit." },
      { "heading": "Problem & Solution", "body": "Briefly describe the problem your target audience faces and how your product solves it." },
      { "heading": "Key Features (Bulleted List)", "body": "List 3-5 key features, and for each, explain the direct benefit to the user. (e.g., 'Feature X so you can achieve Y')." },
      { "heading": "What's Included", "body": "Clearly state everything the customer will get upon purchase (e.g., '1x PDF Guide, 1x Video Tutorial, Access to a private community')." },
      { "heading": "Who Is This For?", "body": "Specify the ideal customer for this product to help with qualification." }
    ],
    "faq": [
      { "question": "A frequently asked question a potential customer might have about this specific product.", "answer": "A clear, concise answer to that question." },
      { "question": "A second common question.", "answer": "The answer to the second question." },
      { "question": "A third relevant question about logistics, usage, or outcomes.", "answer": "The answer to the third question." }
    ]
  },
  "pricingStrategy": {
    "title": "Pricing Strategy",
    "recommendation": "A suggested price point or tier (e.g., '$29 - One-time Purchase', or 'Tier 1: $19, Tier 2: $49').",
    "justification": "A brief explanation for the pricing, considering the product's value, target audience, and market standards."
  },
  "promotionalContent": {
    "title": "Promotional Content Ideas",
    "sampleTweet": "A concise and engaging tweet (under 280 characters) to announce the product launch. Include hashtags.",
    "sampleEmail": "A short, compelling email snippet to send to an email list announcing the product. Focus on the main benefit and a clear call to action."
  },
  "seoKeywords": { "title": "SEO Keywords List", "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6"] },
  "navigationAndCTA": {
    "title": "Navigation & CTA Recommendations",
    "recommendations": [
      "Recommendation for a clear Call-To-Action button text (e.g., 'Use 'I want this!' or 'Get Instant Access' instead of a generic 'Buy').",
      "Recommendation for using links in the profile bio.",
      "Recommendation for product naming conventions."
    ]
  }
}
`;
};

const generateProfileData = async (ai: GoogleGenAI, productInfo: string, tone: Tone): Promise<Omit<GeneratedContent, 'coverImageIdeas'>> => {
    const prompt = generateJsonPrompt(productInfo, tone);
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: prompt,
        config: { responseMimeType: "application/json", temperature: 0.7 },
    });
    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
        jsonStr = match[2].trim();
    }
    return JSON.parse(jsonStr);
};

const generateCoverImages = async (ai: GoogleGenAI, profileData: Omit<GeneratedContent, 'coverImageIdeas'>, productInfo: string): Promise<{prompt: string, images: string[]}> => {
    const imageGenPrompt = `
      Create a high-quality, professional Gumroad cover photo (aspect ratio approximately 1280x280).
      The product is about: "${productInfo}".
      The brand's essence is: "${profileData.profileOverview.variations[0]}".
      The visual style should be clean, modern, and engaging, guided by these principles: primary color ~${profileData.visuals.colorPalette.primary.hex}, typography style ~${profileData.visuals.typography.headingFont.name}, and overall imagery feel of ${profileData.visuals.iconsAndImagery.imageryGuidance}. Avoid text.
    `.trim();

    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: imageGenPrompt,
        config: { numberOfImages: 2, outputMimeType: 'image/jpeg' },
    });
    const base64Images = response.generatedImages.map(img => img.image.imageBytes);
    return { prompt: imageGenPrompt, images: base64Images };
};

const generateGumroadProfile = async (ai: GoogleGenAI, productInfo: string, tone: Tone): Promise<GeneratedContent> => {
    try {
        const profileData = await generateProfileData(ai, productInfo, tone);
        const { prompt, images } = await generateCoverImages(ai, profileData, productInfo);
        const fullContent: GeneratedContent = {
            ...profileData,
            coverImageIdeas: {
                title: "AI-Generated Cover Image Ideas",
                prompt: prompt,
                images: images,
            }
        };
        return fullContent;
    } catch (e) {
        console.error("Error during content generation pipeline:", e);
        if (e instanceof Error && e.message.includes('JSON')) {
             throw new Error("Failed to parse data from the AI. The response may not be valid JSON.");
        }
        throw new Error("An error occurred while generating the profile strategy. Please try again.");
    }
};
