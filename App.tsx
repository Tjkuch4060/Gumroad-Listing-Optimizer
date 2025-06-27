import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { generateGumroadProfile } from './services/geminiService';
import type { GeneratedContent, Tone } from './types';
import { FeedbackAndShare } from './components/FeedbackAndShare';
import { PrivacyPolicy } from './components/PrivacyPolicy';

const App: React.FC = () => {
  const [productInfo, setProductInfo] = useState<string>('');
  const [tone, setTone] = useState<Tone>('Professional');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  const handleGenerate = useCallback(async () => {
    if (!productInfo.trim()) {
      setError('Please describe your product first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    setFeedbackSubmitted(false); // Reset feedback on new generation

    try {
      const content = await generateGumroadProfile(productInfo, tone);
      setGeneratedContent(content);
    } catch (e) {
      console.error(e);
      // Simplified error message, as details now come from our own serverless function
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate profile. ${errorMessage}. This can happen during peak load, please try again in a moment!`);
    } finally {
      setIsLoading(false);
    }
  }, [productInfo, tone]);

  const handleFeedback = (feedback: 'good' | 'bad') => {
      // In a real app, you'd send this to your analytics service.
      console.log(`User feedback: ${feedback}`);
      setFeedbackSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Header />
        <InputSection
          value={productInfo}
          setValue={setProductInfo}
          tone={tone}
          setTone={setTone}
          onSubmit={handleGenerate}
          isLoading={isLoading}
        />

        {error && (
          <div className="mt-8 text-center text-red-400 bg-red-900/20 p-4 rounded-lg">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}

        <OutputSection content={generatedContent} isLoading={isLoading} />

        {!isLoading && generatedContent && (
            <FeedbackAndShare 
                isFeedbackSubmitted={feedbackSubmitted}
                onFeedbackSubmit={handleFeedback}
            />
        )}
        
        <footer className="text-center mt-16 text-slate-500 text-sm flex items-center justify-center gap-4">
            <p>Powered by Gemini API &amp; Imagen 3</p>
            <span className="text-slate-600">|</span>
            <PrivacyPolicy />
        </footer>
      </main>
    </div>
  );
};

export default App;