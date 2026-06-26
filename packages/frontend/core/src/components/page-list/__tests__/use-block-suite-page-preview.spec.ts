/**
 * @vitest-environment happy-dom
 */
import 'fake-indexeddb/auto';

import { getStoreManager } from '@blank/core/blocksuite/manager/store';
import { type Store, Text } from '@blocksuite/blank/store';
import { TestWorkspace } from '@blocksuite/blank/store/test';
import { renderHook } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { useBlockSuitePagePreview } from '../use-block-suite-page-preview';
let docCollection: TestWorkspace;

const extensions = getStoreManager().config.init().value.get('store');

beforeEach(async () => {
  vi.useFakeTimers({ toFake: ['requestIdleCallback'] });
  vi.mock('emoji-mart', () => {
    return {
      Picker: vi.fn(),
    };
  });
  docCollection = new TestWorkspace({ id: 'test' });
  docCollection.meta.initialize();
  const initPage = async (page: Store) => {
    page.load();
    expect(page).not.toBeNull();
    const pageBlockId = page.addBlock('blank:page', {
      title: new Text(''),
    });
    const frameId = page.addBlock('blank:note', {}, pageBlockId);
    page.addBlock('blank:paragraph', {}, frameId);
  };
  const store = docCollection.createDoc('page0').getStore({ extensions });
  await initPage(store);
});

describe('useBlockSuitePagePreview', () => {
  test('basic', async () => {
    const page = docCollection.getDoc('page0')?.getStore();
    if (!page) {
      throw new Error('Page not found');
    }
    const id = page.addBlock(
      'blank:paragraph',
      {
        text: new Text('Hello, world!'),
      },
      page.getModelsByFlavour('blank:note')[0].id
    );
    const hook = renderHook(() => useAtomValue(useBlockSuitePagePreview(page)));
    expect(hook.result.current).toBe('Hello, world!');
    page.transact(() => {
      page.getModelById(id)!.text!.insert('Test', 0);
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    hook.rerender();
    expect(hook.result.current).toBe('TestHello, world!');

    // Insert before
    page.addBlock(
      'blank:paragraph',
      {
        text: new Text('First block!'),
      },
      page.getModelsByFlavour('blank:note')[0].id,
      0
    );
    await new Promise(resolve => setTimeout(resolve, 100));
    hook.rerender();
    expect(hook.result.current).toBe('First block! TestHello, world!');
  });
});
