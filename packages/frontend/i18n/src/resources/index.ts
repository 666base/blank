import en from './en.json' with { type: 'json' };

export type Language = 'en' | 'bg';

export type LanguageResource = typeof en;
export const SUPPORTED_LANGUAGES: Record<
  Language,
  {
    name: string;
    originalName: string;
    flagEmoji: string;
    rtl?: boolean;
    resource:
      | LanguageResource
      | (() => Promise<{ default: Partial<LanguageResource> }>);
  }
> = {
  en: {
    name: 'English',
    originalName: 'English',
    flagEmoji: '🇬🇧',
    resource: en,
  },
  bg: {
    name: 'Bulgarian',
    originalName: 'Български',
    flagEmoji: '🇧🇬',
    resource: () => import('./bg.json'),
  },
};
