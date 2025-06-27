import React, { useState, useCallback } from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

interface ResultCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  textValue?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ title, icon, children, className = '', textValue }) => {
  const [copied, setCopied] = useState(false);

  const textToCopy = textValue || '';

  const handleCopy = useCallback(() => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [textToCopy]);

  return (
    <div className={`group relative p-px rounded-xl ${className}`}>
      <div 
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ animation: 'gradient-animate 4s ease-in-out infinite' }}
      ></div>
      <div className="relative bg-slate-800/80 backdrop-blur-sm p-6 rounded-[11px] h-full flex flex-col transition-transform duration-300 transform group-hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <span className="text-purple-400">{icon}</span>
            <h3 className="text-xl font-bold text-slate-100">{title}</h3>
          </div>
          {textToCopy && (
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-purple-400 disabled:text-slate-600 transition-colors p-1 flex items-center gap-1.5"
              aria-label="Copy content"
              disabled={copied}
            >
              {copied ? (
                <>
                  <CheckIcon className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-green-400">Copied!</span>
                </>
              ) : (
                <CopyIcon className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        <div className="flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};
