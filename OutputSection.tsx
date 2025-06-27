import React, { useState } from 'react';
import type { GeneratedContent } from '../types';
import { ResultCard } from './ResultCard';
import { ProfileIcon } from './icons/ProfileIcon';
import { VisualsIcon } from './icons/VisualsIcon';
import { DescriptionIcon } from './icons/DescriptionIcon';
import { SeoIcon } from './icons/SeoIcon';
import { CtaIcon } from './icons/CtaIcon';
import { ImageIcon } from './icons/ImageIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { PricingIcon } from './icons/PricingIcon';
import { PromotionIcon } from './icons/PromotionIcon';
import { PaletteIcon, TypographyIcon, IconsIcon, LayoutIcon, VoiceIcon, EngagementIcon } from './icons/VisualsSubIcons';

interface OutputSectionProps {
  content: GeneratedContent | null;
  isLoading: boolean;
}

const SkeletonCard: React.FC<{className?: string, isTall?: boolean}> = ({className, isTall}) => (
    <div className={`bg-slate-800/50 p-6 rounded-xl border border-slate-700 overflow-hidden ${className}`}>
        <div className="h-6 rounded w-1/3 mb-4 animate-shimmer"></div>
        <div className="space-y-2">
            <div className="h-4 rounded w-full animate-shimmer"></div>
            <div className="h-4 rounded w-5/6 animate-shimmer"></div>
            <div className={`h-4 rounded w-3/4 animate-shimmer ${isTall ? 'mb-8' : ''}`}></div>
             {isTall && <>
                <div className="h-4 rounded w-full animate-shimmer"></div>
                <div className="h-4 rounded w-full animate-shimmer"></div>
                <div className="h-4 rounded w-4/6 animate-shimmer"></div>
                <div className="h-4 rounded w-5/6 mt-4 animate-shimmer"></div>
                <div className="h-4 rounded w-full animate-shimmer"></div>
            </>}
        </div>
    </div>
);


export const OutputSection: React.FC<OutputSectionProps> = ({ content, isLoading }) => {
  const [activeOverviewTab, setActiveOverviewTab] = useState(0);

  if (isLoading) {
    return (
        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
           <SkeletonCard className="lg:col-span-2" />
           <SkeletonCard className="lg:col-span-2" isTall={true} />
           <SkeletonCard className="lg:col-span-2" isTall={true}/>
           <SkeletonCard />
           <SkeletonCard />
           <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 overflow-hidden lg:col-span-2">
                <div className="h-6 bg-slate-700 rounded w-1/4 mb-4 animate-shimmer"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-32 bg-slate-700 rounded-lg animate-shimmer"></div>
                    <div className="h-32 bg-slate-700 rounded-lg animate-shimmer"></div>
                </div>
           </div>
           <SkeletonCard />
           <SkeletonCard />
        </div>
    );
  }
  
  if (!content) {
    return (
        <div className="mt-12 text-center text-slate-500 border-2 border-dashed border-slate-700 rounded-xl p-12">
            <SparklesIcon className="w-12 h-12 mx-auto text-slate-600" />
            <h3 className="mt-4 text-xl font-semibold text-slate-300">Your AI-Powered Strategy Awaits</h3>
            <p className="mt-1 text-slate-400">Describe your product above and click "Generate" to see the magic happen.</p>
        </div>
    );
  }

  const { profileOverview, visuals, productDescriptionTemplate, pricingStrategy, promotionalContent, seoKeywords, navigationAndCTA, coverImageIdeas } = content;
  
  const overviewText = `Tagline: ${profileOverview.tagline}\n\n${profileOverview.variations.map((v, i) => `Option ${i+1}:\n${v}`).join('\n\n')}`;

  const visualsText = `
**Color Palette**
- Primary: ${visuals.colorPalette.primary.name} (${visuals.colorPalette.primary.hex}) - ${visuals.colorPalette.primary.meaning}
- Secondary: ${visuals.colorPalette.secondary.name} (${visuals.colorPalette.secondary.hex}) - ${visuals.colorPalette.secondary.meaning}
- Accent: ${visuals.colorPalette.accent.name} (${visuals.colorPalette.accent.hex}) - ${visuals.colorPalette.accent.meaning}

**Typography**
- Heading Font: ${visuals.typography.headingFont.name} (${visuals.typography.headingFont.style}, ${visuals.typography.headingFont.size})
- Body Font: ${visuals.typography.bodyFont.name} (${visuals.typography.bodyFont.style}, ${visuals.typography.bodyFont.size})
- Justification: ${visuals.typography.pairingJustification}

**Icons & Imagery**
- Icon Style: ${visuals.iconsAndImagery.iconStyle}
- Icon Set Example: ${visuals.iconsAndImagery.iconSetExample}
- Imagery Guidance: ${visuals.iconsAndImagery.imageryGuidance}

**Layout & Spacing**
- Layout System: ${visuals.layoutAndSpacing.layoutSystem}
- Spacing Guidance: ${visuals.layoutAndSpacing.spacingGuidance}

**Brand Voice**
- Tone Description: ${visuals.brandVoice.toneDescription}
- Messaging Tip: ${visuals.brandVoice.messagingTip}

**User Engagement**
- Animation Suggestion: ${visuals.userEngagement.animationSuggestion}
- Feedback Suggestion: ${visuals.userEngagement.feedbackSuggestion}
  `.trim();

  const faqText = productDescriptionTemplate.faq
    ?.map(item => `Q: ${item.question}\nA: ${item.answer}`)
    .join('\n\n') || '';

  const descriptionText = [
    productDescriptionTemplate.template
        .map(item => `${item.heading}\n${item.body}`)
        .join('\n\n'),
    faqText ? `\n\nFrequently Asked Questions\n${faqText}` : ''
  ].join('').trim();


  const pricingText = `Recommended Price: ${pricingStrategy.recommendation}\n\nJustification:\n${pricingStrategy.justification}`;
  const promotionText = `Sample Tweet:\n${promotionalContent.sampleTweet}\n\nSample Email Snippet:\n${promotionalContent.sampleEmail}`;

  const SubHeading: React.FC<{icon: React.ReactNode, title: string}> = ({icon, title}) => (
    <div className="flex items-center gap-2">
      <span className="text-purple-400">{icon}</span>
      <h4 className="font-semibold text-slate-200">{title}</h4>
    </div>
  );
  
  const FadeInContent: React.FC<{ contentKey: string | number, children: React.ReactNode }> = ({ contentKey, children }) => (
    <div key={contentKey} className="animate-[fade-in_0.5s_ease-in-out]">
        {children}
    </div>
  );

  return (
    <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
      <ResultCard 
        title={profileOverview.title} 
        icon={<ProfileIcon className="w-6 h-6" />}
        textValue={overviewText}
        className="lg:col-span-2"
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-purple-400">Catchy Tagline</h4>
            <p className="text-slate-200 text-lg">"{profileOverview.tagline}"</p>
          </div>
          
          <div className="border-t border-slate-700/60 pt-4">
             <div className="flex mb-2 -mt-1">
                {profileOverview.variations.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveOverviewTab(index)}
                    className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors focus:outline-none ${
                      activeOverviewTab === index
                        ? 'bg-slate-900/50 text-purple-400'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    Option {index + 1}
                  </button>
                ))}
            </div>
            <div className="p-4 bg-slate-900/50 rounded-b-md rounded-tr-md min-h-[80px]">
                <FadeInContent contentKey={activeOverviewTab}>
                    <p className="text-slate-300">{profileOverview.variations[activeOverviewTab]}</p>
                </FadeInContent>
            </div>
          </div>
        </div>
      </ResultCard>

      <ResultCard 
        title={visuals.title} 
        icon={<VisualsIcon className="w-6 h-6" />}
        textValue={visualsText}
        className="lg:col-span-2"
      >
        <div className="space-y-6 text-slate-300">
          {/* Color Palette */}
          <div className="space-y-3">
            <SubHeading icon={<PaletteIcon className="w-5 h-5" />} title="Color Palette" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {[visuals.colorPalette.primary, visuals.colorPalette.secondary, visuals.colorPalette.accent].map((color, index) => (
                <div key={index}>
                  <div className="w-full h-12 rounded-lg border border-slate-600 mb-2" style={{backgroundColor: color.hex}}></div>
                  <p className="font-bold text-sm text-slate-200">{color.name}</p>
                  <p className="text-xs font-mono text-slate-400">{color.hex}</p>
                  <p className="text-xs text-slate-400 mt-1">{color.meaning}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-3">
            <SubHeading icon={<TypographyIcon className="w-5 h-5" />} title="Typography" />
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <p className="text-lg font-bold" style={{fontFamily: visuals.typography.headingFont.name.split(',')[0]}}>Aa - {visuals.typography.headingFont.name}</p>
              <p className="text-sm text-slate-400">{visuals.typography.headingFont.style} ({visuals.typography.headingFont.size})</p>
              <div className="border-t border-slate-700 my-3"></div>
              <p className="text-base" style={{fontFamily: visuals.typography.bodyFont.name.split(',')[0]}}>Aa - {visuals.typography.bodyFont.name}</p>
              <p className="text-sm text-slate-400">{visuals.typography.bodyFont.style} ({visuals.typography.bodyFont.size})</p>
            </div>
            <p className="text-sm text-slate-400">{visuals.typography.pairingJustification}</p>
          </div>
          
          {[
            {icon: <IconsIcon className="w-5 h-5" />, title: 'Icons & Imagery', content: [
              {label: 'Style', value: visuals.iconsAndImagery.iconStyle},
              {label: 'Example Set', value: visuals.iconsAndImagery.iconSetExample},
              {label: 'Guidance', value: visuals.iconsAndImagery.imageryGuidance},
            ]},
            {icon: <LayoutIcon className="w-5 h-5" />, title: 'Layout & Spacing', content: [
              {label: 'System', value: visuals.layoutAndSpacing.layoutSystem},
              {label: 'Guidance', value: visuals.layoutAndSpacing.spacingGuidance},
            ]},
             {icon: <VoiceIcon className="w-5 h-5" />, title: 'Brand Voice', content: [
              {label: 'Description', value: visuals.brandVoice.toneDescription},
              {label: 'Tip', value: visuals.brandVoice.messagingTip},
            ]},
             {icon: <EngagementIcon className="w-5 h-5" />, title: 'User Engagement', content: [
              {label: 'Animation', value: visuals.userEngagement.animationSuggestion},
              {label: 'Feedback', value: visuals.userEngagement.feedbackSuggestion},
            ]},
          ].map(section => (
            <div key={section.title} className="space-y-2">
                <SubHeading icon={section.icon} title={section.title} />
                 {section.content.map(item => (
                    <div key={item.label} className="text-sm p-3 bg-slate-900/50 rounded-lg">
                        <p className="font-semibold text-slate-300">{item.label}</p>
                        <p className="text-slate-400">{item.value}</p>
                    </div>
                ))}
            </div>
          ))}
        </div>
      </ResultCard>

      <ResultCard 
        title={productDescriptionTemplate.title} 
        icon={<DescriptionIcon className="w-6 h-6" />} 
        className="lg:col-span-2"
        textValue={descriptionText}
      >
        <div className="space-y-4">
          {productDescriptionTemplate.template.map((item, index) => (
            <div key={index}>
              <h4 className="font-semibold text-purple-400">{item.heading}</h4>
              <p className="text-slate-300">{item.body}</p>
            </div>
          ))}
        </div>
        
        {productDescriptionTemplate.faq && productDescriptionTemplate.faq.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-700/60">
                <h4 className="font-semibold text-purple-400 mb-3 text-base">Frequently Asked Questions</h4>
                <div className="space-y-2">
                    {productDescriptionTemplate.faq.map((item, index) => (
                        <details key={index} className="bg-slate-900/50 rounded-lg group transition-all duration-300">
                            <summary className="p-3 font-medium text-slate-200 cursor-pointer list-none flex justify-between items-center group-hover:bg-slate-800/40 rounded-lg group-open:rounded-b-none">
                                {item.question}
                                <svg className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </summary>
                            <div className="p-3 border-t border-slate-700/60">
                                <p className="text-slate-300">{item.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        )}
      </ResultCard>

      <ResultCard
        title={pricingStrategy.title}
        icon={<PricingIcon className="w-6 h-6" />}
        textValue={pricingText}
      >
        <div className="space-y-2">
          <p className="text-2xl font-bold text-green-400 bg-green-900/30 px-4 py-2 rounded-lg inline-block">{pricingStrategy.recommendation}</p>
          <p className="text-slate-300 pt-2">{pricingStrategy.justification}</p>
        </div>
      </ResultCard>

      <ResultCard
        title={promotionalContent.title}
        icon={<PromotionIcon className="w-6 h-6" />}
        textValue={promotionText}
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-purple-400">Sample Tweet</h4>
            <p className="text-slate-300 whitespace-pre-wrap font-mono text-sm bg-slate-900 p-3 rounded-md mt-1">{promotionalContent.sampleTweet}</p>
          </div>
          <div>
            <h4 className="font-semibold text-purple-400">Launch Email Snippet</h4>
            <p className="text-slate-300 whitespace-pre-wrap bg-slate-900 p-3 rounded-md mt-1">{promotionalContent.sampleEmail}</p>
          </div>
        </div>
      </ResultCard>
      
       {coverImageIdeas && coverImageIdeas.images.length > 0 && (
         <ResultCard 
            title={coverImageIdeas.title} 
            icon={<ImageIcon className="w-6 h-6" />} 
            className="lg:col-span-2"
            // No textValue here, so the copy button will not appear
         >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coverImageIdeas.images.map((base64Image, index) => (
              <img 
                key={index} 
                src={`data:image/jpeg;base64,${base64Image}`} 
                alt={`AI generated cover concept ${index + 1}`} 
                className="rounded-lg w-full object-cover aspect-[1280/380]"
              />
            ))}
          </div>
          <details className="mt-4 text-xs text-slate-400">
            <summary className="cursor-pointer hover:text-slate-200">View image generation prompt</summary>
            <p className="mt-2 p-3 bg-slate-900 rounded">{coverImageIdeas.prompt}</p>
          </details>
         </ResultCard>
       )}

      <ResultCard 
        title={seoKeywords.title} 
        icon={<SeoIcon className="w-6 h-6" />}
        textValue={seoKeywords.keywords.join(', ')}
      >
        <div className="flex flex-wrap gap-2">
          {seoKeywords.keywords.map((keyword, index) => (
            <span key={index} className="bg-slate-700 text-slate-200 text-sm font-medium px-3 py-1 rounded-full">
              {keyword}
            </span>
          ))}
        </div>
      </ResultCard>

      <ResultCard 
        title={navigationAndCTA.title} 
        icon={<CtaIcon className="w-6 h-6" />}
        textValue={navigationAndCTA.recommendations.map(item => `- ${item}`).join('\n')}
      >
        <ul className="list-disc list-inside space-y-2 text-slate-300">
          {navigationAndCTA.recommendations.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </ResultCard>
    </div>
  );
};
