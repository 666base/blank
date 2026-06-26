import { z } from 'zod';

export const appSchemes = z.enum([
  'blank',
  'blank-canary',
  'blank-beta',
  'blank-internal',
  'blank-dev',
]);

export type Scheme = z.infer<typeof appSchemes>;
export type Channel = 'stable' | 'canary' | 'beta' | 'internal';

export const schemeToChannel = {
  blank: 'stable',
  'blank-canary': 'canary',
  'blank-beta': 'beta',
  'blank-internal': 'internal',
  'blank-dev': 'canary', // dev does not have a dedicated app. use canary as the placeholder.
} as Record<Scheme, Channel>;

export const channelToScheme = {
  stable: 'blank',
  canary:
    typeof BUILD_CONFIG !== 'undefined' && BUILD_CONFIG.debug
      ? 'blank-dev'
      : 'blank-canary',
  beta: 'blank-beta',
  internal: 'blank-internal',
} as Record<Channel, Scheme>;

export const appIconMap = {
  stable: '/imgs/blank-app-icon.png',
  canary: '/imgs/blank-app-icon.png',
  beta: '/imgs/blank-app-icon.png',
  internal: '/imgs/blank-app-icon.png',
} satisfies Record<Channel, string>;

export const appNames = {
  stable: 'Blank',
  canary: 'Blank',
  beta: 'Blank',
  internal: 'Blank',
} satisfies Record<Channel, string>;

export const appSchemaUrl = z.custom<string>(
  (url: string) => {
    try {
      return appSchemes.safeParse(new URL(url).protocol.replace(':', ''))
        .success;
    } catch {
      return false;
    }
  },
  { message: 'Invalid URL or protocol' }
);
