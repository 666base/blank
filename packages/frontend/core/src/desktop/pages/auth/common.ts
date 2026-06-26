import { z } from 'zod';

export const supportedClient = z.enum([
  'web',
  'blank',
  'blank-canary',
  'blank-beta',
  ...(BUILD_CONFIG.debug ? ['blank-dev'] : []),
]);
