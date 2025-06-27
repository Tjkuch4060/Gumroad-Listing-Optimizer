
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center justify-center gap-3">
          <SparklesIcon className="w-8 h-8 text-purple-400" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Gumroad Profile Optimizer AI
          </h1>
        </div>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
        Describe your product or niche, and our AI marketing specialist will generate an optimized Gumroad profile strategy to boost your sales.
      </p>
    </header>
  );
};
