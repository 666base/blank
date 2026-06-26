/**
 * @vitest-environment happy-dom
 */
import type { TextSelection } from '@blocksuite/std';
import { describe, expect, it } from 'vitest';

import { replaceSelectedTextWithBlocksCommand } from '../../../commands/model-crud/replace-selected-text-with-blocks';
import { blank, block } from '../../../test-utils';

describe('commands/model-crud', () => {
  describe('replaceSelectedTextWithBlocksCommand', () => {
    it('should replace selected text with blocks when both first and last blocks are mergable blocks', () => {
      const host = blank`
        <blank-page id="page">
          <blank-note id="note">
            <blank-paragraph id="paragraph-1">Hel<anchor />lo</blank-paragraph>
            <blank-paragraph id="paragraph-2">Wor<focus />ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const blocks = [
        block`<blank-paragraph id="111">111</blank-paragraph>`,
        block`<blank-code id="code"></blank-code>`,
        block`<blank-paragraph id="222">222</blank-paragraph>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = blank`
        <blank-page id="page">
          <blank-note id="note">
            <blank-paragraph id="paragraph-1">Hel111</blank-paragraph>
            <blank-code id="code"></blank-code>
            <blank-paragraph id="paragraph-2">222ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when both first and last blocks are mergable blocks in single paragraph', () => {
      const host = blank`
        <blank-page id="page">
          <blank-note id="note">
            <blank-paragraph id="paragraph-1">Hel<anchor></anchor>lo Wor<focus></focus>ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const blocks = [
        block`<blank-paragraph id="111">111</blank-paragraph>`,
        block`<blank-code id="code"></blank-code>`,
        block`<blank-paragraph id="222">222</blank-paragraph>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = blank`
        <blank-page id="page">
          <blank-note id="note">
            <blank-paragraph id="paragraph-1">Hel111</blank-paragraph>
            <blank-code id="code"></blank-code>
            <blank-paragraph id="222">222ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when blocks contains only one mergable block', () => {
      const host = blank`
        <blank-page id="page">
          <blank-note id="note">
            <blank-paragraph id="paragraph-1">Hel<anchor />lo</blank-paragraph>
            <blank-paragraph id="paragraph-2">Wor<focus />ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const blocks = [block`<blank-paragraph id="111">111</blank-paragraph>`]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = blank`
        <blank-page id="page">
          <blank-note id="note">
            <blank-paragraph id="paragraph-1">Hel111ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when blocks contains only one mergable block in single paragraph', () => {
      const host = blank`
        <blank-page id="page">
          <blank-note id="note">
            <blank-paragraph id="paragraph-1">Hel<anchor></anchor>lo Wor<focus></focus>ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const blocks = [block`<blank-paragraph id="111">111</blank-paragraph>`]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = blank`
        <blank-page id="page">
          <blank-note id="note">
            <blank-paragraph id="paragraph-1">Hel111ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when only first block is mergable block', () => {
      const host = blank`
        <blank-page>
          <blank-note>
            <blank-paragraph>Hel<anchor />lo</blank-paragraph>
            <blank-paragraph>Wor<focus />ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const blocks = [
        block`<blank-paragraph>111</blank-paragraph>`,
        block`<blank-code></blank-code>`,
        block`<blank-code></blank-code>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = blank`
        <blank-page>
          <blank-note >
            <blank-paragraph>Hel111</blank-paragraph>
            <blank-code></blank-code>
            <blank-code></blank-code>
            <blank-paragraph>ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when only first block is mergable block in single paragraph', () => {
      const host = blank`
        <blank-page>
          <blank-note>
            <blank-paragraph>Hel<anchor></anchor>lo Wor<focus></focus>ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const blocks = [
        block`<blank-paragraph>111</blank-paragraph>`,
        block`<blank-code></blank-code>`,
        block`<blank-code></blank-code>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = blank`
        <blank-page>
          <blank-note>
            <blank-paragraph>Hel111</blank-paragraph>
            <blank-code></blank-code>
            <blank-code></blank-code>
            <blank-paragraph>ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when only last block is mergable block', () => {
      const host = blank`
        <blank-page>
          <blank-note>
            <blank-paragraph>Hel<anchor />lo</blank-paragraph>
            <blank-paragraph>Wor<focus />ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const blocks = [
        block`<blank-code></blank-code>`,
        block`<blank-code></blank-code>`,
        block`<blank-paragraph>111</blank-paragraph>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = blank`
        <blank-page>
          <blank-note >
            <blank-paragraph>Hel</blank-paragraph>
            <blank-code></blank-code>
            <blank-code></blank-code>
            <blank-paragraph>111ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;
      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when only last block is mergable block in single paragraph', () => {
      const host = blank`
        <blank-page>
          <blank-note>
            <blank-paragraph>Hel<anchor></anchor>lo Wor<focus></focus>ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const blocks = [
        block`<blank-code></blank-code>`,
        block`<blank-code></blank-code>`,
        block`<blank-paragraph>111</blank-paragraph>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = blank`
        <blank-page>
          <blank-note>
            <blank-paragraph>Hel</blank-paragraph>
            <blank-code></blank-code>
            <blank-code></blank-code>
            <blank-paragraph>111ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;
      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when neither first nor last block is mergable block', () => {
      const host = blank`
        <blank-page>
          <blank-note>
            <blank-paragraph>Hel<anchor />lo</blank-paragraph>
            <blank-paragraph>Wor<focus />ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const blocks = [
        block`<blank-code></blank-code>`,
        block`<blank-code></blank-code>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = blank`
        <blank-page>
          <blank-note >
            <blank-paragraph>Hel</blank-paragraph>
            <blank-code></blank-code>
            <blank-code></blank-code>
            <blank-paragraph>ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;
      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when neither first nor last block is mergable block in single paragraph', () => {
      const host = blank`
        <blank-page>
          <blank-note>
            <blank-paragraph>Hel<anchor></anchor>lo Wor<focus></focus>ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const blocks = [
        block`<blank-code></blank-code>`,
        block`<blank-code></blank-code>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = blank`
        <blank-page>
          <blank-note>
            <blank-paragraph>Hel</blank-paragraph>
            <blank-code></blank-code>
            <blank-code></blank-code>
            <blank-paragraph>ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;
      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when both first and last blocks are mergable blocks with different types', () => {
      const host = blank`
        <blank-page>
          <blank-note>
            <blank-paragraph>Hel<anchor />lo</blank-paragraph>
            <blank-paragraph>Wor<focus />ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const blocks = [
        block`<blank-list>1.</blank-list>`,
        block`<blank-list>2.</blank-list>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = blank`
        <blank-page>
          <blank-note >
            <blank-paragraph>Hel</blank-paragraph>
            <blank-list>1.</blank-list>
            <blank-list>2.</blank-list>
            <blank-paragraph>ld</blank-paragraph>
          </blank-note>
        </blank-page>
      `;
      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when both first and last blocks are paragraphs, and cursor is at the end of the text-block with different types', () => {
      const host = blank`
        <blank-page>
          <blank-note>
            <blank-list>Hel<anchor />lo</blank-list>
            <blank-list>Wor<focus />ld</blank-list>
          </blank-note>
        </blank-page>
      `;

      const blocks = [
        block`<blank-paragraph>111</blank-paragraph>`,
        block`<blank-paragraph>222</blank-paragraph>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = blank`
        <blank-page>
          <blank-note >
            <blank-list>Hel111</blank-list>
            <blank-list>222ld</blank-list>
          </blank-note>
        </blank-page>
      `;
      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when first block is paragraph, and cursor is at the end of the text-block with different type  ', () => {
      const host = blank`
        <blank-page>
          <blank-note>
            <blank-list>Hel<anchor />lo</blank-list>
            <blank-list>Wor<focus />ld</blank-list>
          </blank-note>
        </blank-page>
      `;

      const blocks = [
        block`<blank-paragraph>111</blank-paragraph>`,
        block`<blank-code></blank-code>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = blank`
        <blank-page>
          <blank-note >
            <blank-list>Hel111</blank-list>
            <blank-code></blank-code>
            <blank-list>ld</blank-list>
          </blank-note>
        </blank-page>
      `;
      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when last block is paragraph, and cursor is at the end of the text-block with different type  ', () => {
      const host = blank`
        <blank-page>
          <blank-note>
            <blank-list>Hel<anchor />lo</blank-list>
            <blank-list>Wor<focus />ld</blank-list>
          </blank-note>
        </blank-page>
      `;

      const blocks = [
        block`<blank-code></blank-code>`,
        block`<blank-paragraph>222</blank-paragraph>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = blank`
        <blank-page>
          <blank-note >
            <blank-list>Hel</blank-list>
            <blank-code></blank-code>
            <blank-list>222ld</blank-list>
          </blank-note>
        </blank-page>
      `;
      expect(host.store).toEqualDoc(expected.store);
    });
  });
});
