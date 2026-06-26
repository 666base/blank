import type { ReactToLit } from '@blank/component';
import type { BlankReference } from '@blocksuite/blank/inlines/reference';
import { ReferenceNodeConfigExtension } from '@blocksuite/blank/inlines/reference';
import type { ExtensionType } from '@blocksuite/blank/store';

export type ReferenceReactRenderer = (
  reference: BlankReference
) => React.ReactElement;

export function patchReferenceRenderer(
  reactToLit: ReactToLit,
  reactRenderer: ReferenceReactRenderer
): ExtensionType {
  const customContent = (reference: BlankReference) => {
    const node = reactRenderer(reference);
    return reactToLit(node, true);
  };

  return ReferenceNodeConfigExtension({
    customContent,
    hidePopup: BUILD_CONFIG.isMobileEdition,
  });
}
