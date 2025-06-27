
export type Tone = 'Professional' | 'Friendly' | 'Witty' | 'Direct';

export interface ProfileOverview {
  title: string;
  tagline: string;
  variations: string[];
}

export interface ColorPaletteInfo {
    primary: { name: string; hex: string; meaning: string; };
    secondary: { name: string; hex: string; meaning: string; };
    accent: { name: string; hex: string; meaning: string; };
}

export interface TypographyInfo {
    headingFont: { name: string; style: string; size: string; };
    bodyFont: { name:string; style: string; size: string; };
    pairingJustification: string;
}

export interface IconsAndImageryInfo {
    iconStyle: string;
    iconSetExample: string;
    imageryGuidance: string;
}

export interface LayoutAndSpacingInfo {
    layoutSystem: string;
    spacingGuidance: string;
}

export interface BrandVoiceInfo {
    toneDescription: string;
    messagingTip: string;
}

export interface UserEngagementInfo {
    animationSuggestion: string;
    feedbackSuggestion: string;
}

export interface Visuals {
    title: string;
    colorPalette: ColorPaletteInfo;
    typography: TypographyInfo;
    iconsAndImagery: IconsAndImageryInfo;
    layoutAndSpacing: LayoutAndSpacingInfo;
    brandVoice: BrandVoiceInfo;
    userEngagement: UserEngagementInfo;
}


export interface DescriptionTemplateItem {
  heading: string;
  body: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProductDescriptionTemplate {
  title: string;
  template: DescriptionTemplateItem[];
  faq?: FaqItem[];
}

export interface PricingStrategy {
  title: string;
  recommendation: string;
  justification: string;
}

export interface PromotionalContent {
  title: string;
  sampleTweet: string;
  sampleEmail: string;
}

export interface SeoKeywords {
  title: string;
  keywords: string[];
}

export interface NavigationAndCTA {
  title: string;
  recommendations: string[];
}

export interface CoverImageIdeas {
  title: string;
  prompt: string;
  images: string[]; // Array of base64 encoded image strings
}

export interface GeneratedContent {
  profileOverview: ProfileOverview;
  visuals: Visuals;
  productDescriptionTemplate: ProductDescriptionTemplate;
  pricingStrategy: PricingStrategy;
  promotionalContent: PromotionalContent;
  seoKeywords: SeoKeywords;
  navigationAndCTA: NavigationAndCTA;
  coverImageIdeas: CoverImageIdeas;
}