import type { Schema } from '@blocksuite/blank/store';

let _schema: Schema | null = null;
let _loading: Promise<Schema> | null = null;

async function loadBlankWorkspaceSchema(): Promise<Schema> {
  const [
    { Schema: SchemaCtor },
    { BlankSchemas },
    { AIChatBlockSchema },
    { TranscriptionBlockSchema },
  ] = await Promise.all([
    import('@blocksuite/blank/store'),
    import('@blocksuite/blank/schemas'),
    import('@blank/core/blocksuite/ai/blocks/ai-chat-block/model'),
    import('@blank/core/blocksuite/ai/blocks/transcription-block/model'),
  ]);

  const schema = new SchemaCtor();
  schema.register([...BlankSchemas, AIChatBlockSchema, TranscriptionBlockSchema]);
  return schema;
}

/** Start loading schema in the background (call during app bootstrap). */
export function preloadBlankWorkspaceSchema() {
  void ensureBlankWorkspaceSchema();
}

export function ensureBlankWorkspaceSchema(): Promise<Schema> {
  if (_schema) {
    return Promise.resolve(_schema);
  }
  if (!_loading) {
    _loading = loadBlankWorkspaceSchema().then(schema => {
      _schema = schema;
      return schema;
    });
  }
  return _loading;
}

/** Sync access — only valid after {@link ensureBlankWorkspaceSchema} resolves. */
export function getBlankWorkspaceSchema(): Schema {
  if (!_schema) {
    throw new Error(
      'Workspace schema is not ready yet. Await ensureBlankWorkspaceSchema() first.'
    );
  }
  return _schema;
}
