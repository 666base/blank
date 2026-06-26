/**
 * @vitest-environment happy-dom
 */

import { getInternalStoreExtensions } from '@blocksuite/blank/extensions/store';
import { StoreExtensionManager } from '@blocksuite/blank-ext-loader';
import { createBlankTemplate } from '@blocksuite/blank-shared/test-utils';
import type { Store } from '@blocksuite/store';
import { describe, expect, it } from 'vitest';

import { applyPatchToDoc } from '../../../../blocksuite/ai/utils/apply-model/apply-patch-to-doc';
import type { PatchOp } from '../../../../blocksuite/ai/utils/apply-model/markdown-diff';

declare module 'vitest' {
  interface Assertion<T = any> {
    toEqualDoc(expected: Store, options?: { compareId?: boolean }): T;
  }
}

const manager = new StoreExtensionManager(getInternalStoreExtensions());
const { blank } = createBlankTemplate(manager.get('store'));

describe('applyPatchToDoc', () => {
  it('should delete a block', async () => {
    const host = blank`
    <blank-page id="page">
      <blank-note id="note">
        <blank-paragraph id="paragraph-1">Hello</blank-paragraph>
        <blank-paragraph id="paragraph-2">World</blank-paragraph>
      </blank-note>
    </blank-page>
  `;

    const patch: PatchOp[] = [{ op: 'delete', id: 'paragraph-1' }];
    await applyPatchToDoc(host.store, patch);

    const expected = blank`
      <blank-page id="page">
        <blank-note id="note">
          <blank-paragraph id="paragraph-2">World</blank-paragraph>
        </blank-note>
      </blank-page>
    `;

    expect(host.store).toEqualDoc(expected.store, {
      compareId: true,
    });
  });

  // FIXME: markdown parse error in test mode
  it.skip('should replace a block', async () => {
    const host = blank`
    <blank-page id="page">
      <blank-note id="note">
        <blank-paragraph id="paragraph-1">Hello</blank-paragraph>
        <blank-paragraph id="paragraph-2">World</blank-paragraph>
      </blank-note>
    </blank-page>
  `;

    const patch: PatchOp[] = [
      {
        op: 'replace',
        id: 'paragraph-1',
        content: 'New content',
      },
    ];

    await applyPatchToDoc(host.store, patch);

    const expected = blank`
      <blank-page id="page">
        <blank-note id="note">
          <blank-paragraph id="paragraph-1">New content</blank-paragraph>
          <blank-paragraph id="paragraph-2">World</blank-paragraph>
        </blank-note>
      </blank-page>
    `;

    expect(host.store).toEqualDoc(expected.store, {
      compareId: true,
    });
  });

  // FIXME: markdown parse error in test mode
  it.skip('should insert a block at index', async () => {
    const host = blank`
    <blank-page id="page">
      <blank-note id="note">
        <blank-paragraph id="paragraph-1">Hello</blank-paragraph>
        <blank-paragraph id="paragraph-2">World</blank-paragraph>
      </blank-note>
    </blank-page>
  `;

    const patch: PatchOp[] = [
      {
        op: 'insert',
        index: 2,
        after: 'paragraph-1',
        block: {
          id: 'paragraph-3',
          type: 'blank:paragraph',
          content: 'Inserted',
        },
      },
    ];

    await applyPatchToDoc(host.store, patch);

    const expected = blank`
      <blank-page id="page">
        <blank-note id="note">
          <blank-paragraph id="paragraph-1">Hello</blank-paragraph>
          <blank-paragraph id="paragraph-2">World</blank-paragraph>
          <blank-paragraph id="paragraph-3">Inserted</blank-paragraph>
        </blank-note>
      </blank-page>
    `;

    expect(host.store).toEqualDoc(expected.store, {
      compareId: true,
    });
  });
});
