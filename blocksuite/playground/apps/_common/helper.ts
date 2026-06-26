import { TestWorkspace } from '@blocksuite/blank/store/test';
import { getTestStoreManager } from '@blocksuite/integration-test/store';

export function createEmptyDoc() {
  const collection = new TestWorkspace();
  collection.storeExtensions = getTestStoreManager().get('store');
  collection.meta.initialize();
  const doc = collection.createDoc();
  const store = doc.getStore();

  return {
    doc,
    init() {
      doc.load();
      const rootId = store.addBlock('blank:page', {});
      store.addBlock('blank:surface', {}, rootId);
      const noteId = store.addBlock('blank:note', {}, rootId);
      store.addBlock('blank:paragraph', {}, noteId);
      return store;
    },
  };
}
