// ORDER MATTERS
import './env';
import './public-path';
import './polyfill/browser';
import './telemetry';

import { isBlankBuild } from '../utils/blank-links';
import { ensureBlankSupabaseConfig } from '../utils/blank-supabase';
import { clearBlankSyncServerUrl } from '../utils/sync-config';

if (isBlankBuild()) {
  clearBlankSyncServerUrl();
  void ensureBlankSupabaseConfig();
}
