import { literal } from 'lit/static-html.js';
import { describe, expect, it, vi } from 'vitest';

import { BlockSchemaExtension } from '../extension/schema.js';
import { defineBlockSchema } from '../model/block/zod.js';
// import some blocks
import { SchemaValidateError } from '../schema/error.js';
import { createAutoIncrementIdGenerator } from '../test/index.js';
import { TestWorkspace } from '../test/test-workspace.js';
import {
  DividerBlockSchemaExtension,
  ListBlockSchemaExtension,
  NoteBlockSchemaExtension,
  ParagraphBlockSchemaExtension,
  RootBlockSchemaExtension,
} from './test-schema.js';

function createTestOptions() {
  const idGenerator = createAutoIncrementIdGenerator();
  return { id: 'test-collection', idGenerator };
}

const TestCustomNoteBlockSchema = defineBlockSchema({
  flavour: 'blank:note-block-video',
  props: internal => ({
    text: internal.Text(),
  }),
  metadata: {
    version: 1,
    role: 'content',
    tag: literal`blank-note-block-video`,
    parent: ['blank:note'],
  },
});

const TestCustomNoteBlockSchemaExtension = BlockSchemaExtension(
  TestCustomNoteBlockSchema
);

const TestInvalidNoteBlockSchema = defineBlockSchema({
  flavour: 'blank:note-invalid-block-video',
  props: internal => ({
    text: internal.Text(),
  }),
  metadata: {
    version: 1,
    role: 'content',
    tag: literal`blank-invalid-note-block-video`,
    parent: ['blank:note'],
  },
});

const TestInvalidNoteBlockSchemaExtension = BlockSchemaExtension(
  TestInvalidNoteBlockSchema
);

const TestRoleBlockSchema = defineBlockSchema({
  flavour: 'blank:note-block-role-test',
  metadata: {
    version: 1,
    role: 'content',
    parent: ['blank:note'],
    children: ['@test'],
  },
  props: internal => ({
    text: internal.Text(),
  }),
});

const TestRoleBlockSchemaExtension = BlockSchemaExtension(TestRoleBlockSchema);

const TestParagraphBlockSchema = defineBlockSchema({
  flavour: 'blank:test-paragraph',
  metadata: {
    version: 1,
    role: 'test',
    parent: ['@content'],
  },
});

const TestParagraphBlockSchemaExtension = BlockSchemaExtension(
  TestParagraphBlockSchema
);

const extensions = [
  RootBlockSchemaExtension,
  ParagraphBlockSchemaExtension,
  ListBlockSchemaExtension,
  NoteBlockSchemaExtension,
  DividerBlockSchemaExtension,
  TestCustomNoteBlockSchemaExtension,
  TestInvalidNoteBlockSchemaExtension,
  TestRoleBlockSchemaExtension,
  TestParagraphBlockSchemaExtension,
];

const defaultDocId = 'doc0';
function createTestDoc(docId = defaultDocId) {
  const options = createTestOptions();
  const collection = new TestWorkspace(options);
  collection.meta.initialize();
  const doc = collection.createDoc(docId);
  doc.load();
  const store = doc.getStore({ extensions });
  return store;
}

describe('schema', () => {
  it('should be able to validate schema by role', () => {
    const consoleMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const doc = createTestDoc();
    const rootId = doc.addBlock('blank:page', {});
    const noteId = doc.addBlock('blank:note', {}, rootId);
    const paragraphId = doc.addBlock('blank:paragraph', {}, noteId);

    doc.addBlock('blank:note', {});
    expect(consoleMock.mock.calls[0]).toSatisfy((call: unknown[]) => {
      return typeof call[0] === 'string';
    });
    expect(consoleMock.mock.calls[1]).toSatisfy((call: unknown[]) => {
      return call[0] instanceof SchemaValidateError;
    });

    consoleMock.mockClear();
    // add paragraph to root should throw
    doc.addBlock('blank:paragraph', {}, rootId);
    expect(consoleMock.mock.calls[0]).toSatisfy((call: unknown[]) => {
      return typeof call[0] === 'string';
    });
    expect(consoleMock.mock.calls[1]).toSatisfy((call: unknown[]) => {
      return call[0] instanceof SchemaValidateError;
    });

    consoleMock.mockClear();
    doc.addBlock('blank:note', {}, rootId);
    doc.addBlock('blank:paragraph', {}, noteId);
    doc.addBlock('blank:paragraph', {}, paragraphId);
    expect(consoleMock).not.toBeCalled();
  });

  it('should glob match works', () => {
    const consoleMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const doc = createTestDoc();
    const rootId = doc.addBlock('blank:page', {});
    const noteId = doc.addBlock('blank:note', {}, rootId);

    doc.addBlock('blank:note-block-video', {}, noteId);
    expect(consoleMock).not.toBeCalled();

    doc.addBlock('blank:note-invalid-block-video', {}, noteId);
    expect(consoleMock.mock.calls[0]).toSatisfy((call: unknown[]) => {
      return typeof call[0] === 'string';
    });
    expect(consoleMock.mock.calls[1]).toSatisfy((call: unknown[]) => {
      return call[0] instanceof SchemaValidateError;
    });
  });

  it('should be able to validate schema by role', () => {
    const consoleMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const doc = createTestDoc();
    const rootId = doc.addBlock('blank:page', {});
    const noteId = doc.addBlock('blank:note', {}, rootId);
    const roleId = doc.addBlock('blank:note-block-role-test', {}, noteId);

    doc.addBlock('blank:paragraph', {}, roleId);
    doc.addBlock('blank:paragraph', {}, roleId);

    expect(consoleMock.mock.calls[1]).toSatisfy((call: unknown[]) => {
      return call[0] instanceof SchemaValidateError;
    });

    consoleMock.mockClear();
    doc.addBlock('blank:test-paragraph', {}, roleId);
    doc.addBlock('blank:test-paragraph', {}, roleId);
    expect(consoleMock).not.toBeCalled();

    expect(doc.getBlocksByFlavour('blank:test-paragraph')).toHaveLength(2);
  });
});
