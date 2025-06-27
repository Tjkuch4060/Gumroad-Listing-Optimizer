import type { GeneratedContent, Tone } from '../types';

export const generateGumroadProfile = async (productInfo: string, tone: Tone): Promise<GeneratedContent> => {
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productInfo, tone }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // Gracefully handle non-json error responses
        const errorMessage = errorData.details || errorData.error || `Request failed with status ${response.status}`;
        throw new Error(errorMessage);
    }

    const data: GeneratedContent = await response.json();
    return data;
};
