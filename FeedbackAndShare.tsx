import React from 'react';
import { ThumbsUpIcon } from './icons/ThumbsUpIcon';
import { ThumbsDownIcon } from './icons/ThumbsDownIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { CheckIcon } from './icons/CheckIcon';

interface FeedbackAndShareProps {
    isFeedbackSubmitted: boolean;
    onFeedbackSubmit: (feedback: 'good' | 'bad') => void;
}

export const FeedbackAndShare: React.FC<FeedbackAndShareProps> = ({ isFeedbackSubmitted, onFeedbackSubmit }) => {

    const handleShare = () => {
        const text = "I just optimized my Gumroad strategy with this awesome AI tool! #Gumroad #AI #Marketing";
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="mt-8 p-6 bg-slate-800/50 border border-slate-700 rounded-xl flex flex-col md:flex-row items-center justify-center gap-6 text-center">
            {isFeedbackSubmitted ? (
                 <div className="flex items-center gap-2 text-green-400 font-medium animate-[fade-in_0.3s_ease]">
                    <CheckIcon className="w-6 h-6" />
                    <span>Thank you for your feedback!</span>
                </div>
            ) : (
                <div className="flex items-center gap-4 animate-[fade-in_0.3s_ease]">
                    <span className="font-medium text-slate-300">Was this result helpful?</span>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => onFeedbackSubmit('good')}
                            className="p-2 rounded-full bg-slate-700/50 hover:bg-green-600/30 text-slate-400 hover:text-green-400 transition-all transform hover:scale-110"
                            aria-label="Helpful"
                        >
                            <ThumbsUpIcon className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => onFeedbackSubmit('bad')}
                            className="p-2 rounded-full bg-slate-700/50 hover:bg-red-600/30 text-slate-400 hover:text-red-400 transition-all transform hover:scale-110"
                            aria-label="Not helpful"
                        >
                            <ThumbsDownIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
           
            <div className="hidden md:block w-px h-8 bg-slate-600"></div>

            <button 
                onClick={handleShare}
                className="flex items-center gap-2.5 px-4 py-2 bg-[#1DA1F2]/10 text-[#1DA1F2] font-semibold rounded-lg hover:bg-[#1DA1F2]/20 transition-colors"
            >
                <TwitterIcon className="w-5 h-5" />
                <span>Share on X</span>
            </button>
        </div>
    );
};
