import type { DocProps } from '@blank/core/blocksuite/initialization';
import type { DocMode } from '@blocksuite/blank/model';

export interface DocCreateOptions {
  id?: string;
  title?: string;
  primaryMode?: DocMode;
  skipInit?: boolean;
  docProps?: DocProps;
  isTemplate?: boolean;
}
