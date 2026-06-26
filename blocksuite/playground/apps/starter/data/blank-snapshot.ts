import { BlankSchemas } from '@blocksuite/blank/schemas';
import { Schema, Text, type Workspace } from '@blocksuite/blank/store';
import { ZipTransformer } from '@blocksuite/blank/widgets/linked-doc';
export async function blankSnapshot(collection: Workspace, id: string) {
  const doc = collection.createDoc(id);
  doc.load();
  const store = doc.getStore();
  // Add root block and surface block at root level
  const rootId = store.addBlock('blank:page', {
    title: new Text('Blank Snapshot Test'),
  });
  store.addBlock('blank:surface', {}, rootId);

  const path = '/apps/starter/data/snapshots/blank-default.zip';
  const response = await fetch(path);
  const file = await response.blob();
  const schema = new Schema();
  schema.register(BlankSchemas);
  await ZipTransformer.importDocs(collection, schema, file);
}

blankSnapshot.id = 'blank-snapshot';
blankSnapshot.displayName = 'Blank Snapshot Test';
blankSnapshot.description = 'Blank Snapshot Test';
