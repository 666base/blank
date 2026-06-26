import { ViewExtensionManager } from '@blocksuite/blank/ext-loader';
import { getInternalViewExtensions } from '@blocksuite/blank/extensions/view';
import { BlockViewIdentifier } from '@blocksuite/blank/std';
import type { ExtensionType } from '@blocksuite/blank/store';
import { literal } from 'lit/static-html.js';

const manager = new ViewExtensionManager([...getInternalViewExtensions()]);
const customPageEditorBlockSpecs: ExtensionType[] = [
  ...manager.get('page'),
  {
    setup: di => {
      di.override(
        BlockViewIdentifier('blank:page'),
        () => literal`blank-page-root`
      );
    },
  },
];

export const getCustomPageEditorBlockSpecs = () => {
  return customPageEditorBlockSpecs;
};
