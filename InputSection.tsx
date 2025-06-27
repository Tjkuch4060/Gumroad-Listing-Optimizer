import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { DiceIcon } from './icons/DiceIcon';
import { ToneIcon } from './icons/ToneIcon';
import type { Tone } from '../types';

interface InputSectionProps {
  value: string;
  setValue: (value: string) => void;
  tone: Tone;
  setTone: (tone: Tone) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const examples = [
    { short: "Blender Course", full: "A course teaching beginners how to create 3D models in Blender." },
    { short: "Icon Pack", full: "A pack of 100+ high-quality, minimalist icons for UI designers." },
    { short: "Fitness Plan", full: "A 12-week personalized fitness and meal plan for busy professionals." },
    { short: "Writing Guide", full: "An ebook guide to freelance writing and finding your first clients." },
    { short: "Notion Template", full: "A Notion template for managing personal finances and budgets." },
];

const tones: Tone[] = ['Professional', 'Friendly', 'Witty', 'Direct'];

export const InputSection: React.FC<InputSectionProps> = ({ value, setValue, tone, setTone, onSubmit, isLoading }) => {
    const [isRolling, setIsRolling] = useState(false);
    
    const handleExampleClick = (fullText: string) => {
        setValue(fullText);
    };

    const handleSurpriseMe = () => {
        setIsRolling(true);
        const randomIndex = Math.floor(Math.random() * examples.length);
        setValue(examples[randomIndex].full);
        setTimeout(() => setIsRolling(false), 500); // Duration of the animation
    };

  return (
    <section className="max-w-3xl mx-auto">
      <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-700">
        <div>
            <label htmlFor="product-info" className="block text-lg font-medium text-slate-300 mb-2">
                Product or Niche Description
            </label>
            <textarea
              id="product-info"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g., A pack of 100+ high-quality icons for UI designers, a course on learning digital marketing, a fitness plan for beginners..."
              className="w-full h-32 p-3 bg-slate-900 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition-shadow text-slate-200 resize-none"
              disabled={isLoading}
            />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="text-slate-400 font-medium shrink-0">Try an example:</span>
            <div className="flex flex-wrap items-center gap-2">
                {examples.slice(0, 3).map((example, index) => (
                    <button 
                        key={index} 
                        onClick={() => handleExampleClick(example.full)}
                        className="px-2 py-1 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                        disabled={isLoading}
                    >
                        {example.short}
                    </button>
                ))}
            </div>
            <button
                onClick={handleSurpriseMe}
                className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-purple-600/20 text-purple-300 border border-purple-600/50 rounded-lg hover:bg-purple-600/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
            >
                <DiceIcon className={`w-4 h-4 ${isRolling ? 'animate-dice-roll' : ''}`} />
                <span className="shrink-0">Surprise Me</span>
            </button>
        </div>

        <div className="mt-6">
            <label className="flex items-center gap-2 text-lg font-medium text-slate-300 mb-2">
                <ToneIcon className="w-5 h-5 text-slate-400" />
                <span>Select Tone</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {tones.map((t) => (
                    <button
                        key={t}
                        onClick={() => setTone(t)}
                        disabled={isLoading}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 ${
                            tone === t
                                ? 'bg-purple-600 text-white shadow'
                                : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
                        }`}
                    >
                        {t}
                    </button>
                ))}
            </div>
        </div>
        
        <button
          onClick={onSubmit}
          disabled={isLoading || !value.trim()}
          className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-100"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              Generate Profile Strategy
            </>
          )}
        </button>
      </div>
    </section>
  );
};
