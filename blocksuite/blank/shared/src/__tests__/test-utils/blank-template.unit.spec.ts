import { TextSelection } from '@blocksuite/std';
import { describe, expect, it } from 'vitest';

import { blank } from '../../test-utils';

describe('helpers/blank-template', () => {
  it('should create a basic document structure from template', () => {
    const host = blank`
      <blank-page id="page">
        <blank-note id="note">
          <blank-paragraph id="paragraph-1">Hello, world</blank-paragraph>
        </blank-note>
      </blank-page>
    `;

    expect(host.store).toBeDefined();

    const pageBlock = host.store.getBlock('page');
    expect(pageBlock).toBeDefined();
    expect(pageBlock?.flavour).toBe('blank:page');

    const noteBlock = host.store.getBlock('note');
    expect(noteBlock).toBeDefined();
    expect(noteBlock?.flavour).toBe('blank:note');

    const paragraphBlock = host.store.getBlock('paragraph-1');
    expect(paragraphBlock).toBeDefined();
    expect(paragraphBlock?.flavour).toBe('blank:paragraph');
  });

  it('should handle nested blocks correctly', () => {
    const host = blank`
      <blank-page>
        <blank-note>
          <blank-paragraph>First paragraph</blank-paragraph>
          <blank-list>List item</blank-list>
          <blank-paragraph>Second paragraph</blank-paragraph>
        </blank-note>
      </blank-page>
    `;

    const noteBlocks = host.store.getBlocksByFlavour('blank:note');
    const paragraphBlocks = host.store.getBlocksByFlavour('blank:paragraph');
    const listBlocks = host.store.getBlocksByFlavour('blank:list');

    expect(noteBlocks.length).toBe(1);
    expect(paragraphBlocks.length).toBe(2);
    expect(listBlocks.length).toBe(1);

    const noteBlock = noteBlocks[0];
    const noteChildren =
      host.store.getBlock(noteBlock.id)?.model.children || [];
    expect(noteChildren.length).toBe(3);

    expect(noteChildren[0].flavour).toBe('blank:paragraph');
    expect(noteChildren[1].flavour).toBe('blank:list');
    expect(noteChildren[2].flavour).toBe('blank:paragraph');
  });

  it('should handle empty blocks correctly', () => {
    const host = blank`
      <blank-page>
        <blank-note>
          <blank-paragraph></blank-paragraph>
        </blank-note>
      </blank-page>
    `;

    const paragraphBlocks = host.store.getBlocksByFlavour('blank:paragraph');
    expect(paragraphBlocks.length).toBe(1);

    const paragraphBlock = host.store.getBlock(paragraphBlocks[0].id);
    const paragraphText = paragraphBlock?.model.text?.toString() || '';
    expect(paragraphText).toBe('');
  });

  it('should throw error on invalid template', () => {
    expect(() => {
      blank`
        <unknown-tag></unknown-tag>
      `;
    }).toThrow();
  });

  it('should handle text selection with anchor and focus', () => {
    const host = blank`
      <blank-page id="page">
        <blank-note id="note">
          <blank-paragraph id="paragraph-1">Hel<anchor />lo</blank-paragraph>
          <blank-paragraph id="paragraph-2">Wo<focus />rld</blank-paragraph>
        </blank-note>
      </blank-page>
    `;

    const selection = host.selection.value[0] as TextSelection;
    expect(selection).toBeDefined();
    expect(selection.is(TextSelection)).toBe(true);
    expect(selection.from.blockId).toBe('paragraph-1');
    expect(selection.from.index).toBe(3);
    expect(selection.from.length).toBe(2);
    expect(selection.to?.blockId).toBe('paragraph-2');
    expect(selection.to?.index).toBe(0);
    expect(selection.to?.length).toBe(2);
  });

  it('should handle cursor position', () => {
    const host = blank`
      <blank-page id="page">
        <blank-note id="note">
          <blank-paragraph id="paragraph-1">Hello<cursor />World</blank-paragraph>
        </blank-note>
      </blank-page>
    `;

    const selection = host.selection.value[0] as TextSelection;
    expect(selection).toBeDefined();
    expect(selection.is(TextSelection)).toBe(true);
    expect(selection.from.blockId).toBe('paragraph-1');
    expect(selection.from.index).toBe(5);
    expect(selection.from.length).toBe(0);
    expect(selection.to).toBeNull();
  });

  it('should handle selection in empty blocks', () => {
    const host = blank`
      <blank-page id="page">
        <blank-note id="note">
          <blank-paragraph id="paragraph-1"><cursor /></blank-paragraph>
        </blank-note>
      </blank-page>
    `;

    const selection = host.selection.value[0] as TextSelection;
    expect(selection).toBeDefined();
    expect(selection.is(TextSelection)).toBe(true);
    expect(selection.from.blockId).toBe('paragraph-1');
    expect(selection.from.index).toBe(0);
    expect(selection.from.length).toBe(0);
    expect(selection.to).toBeNull();
  });

  it('should handle single point selection', () => {
    const host = blank`
      <blank-page id="page">
        <blank-note id="note">
          <blank-paragraph id="paragraph-1">Hello<anchor></anchor>World<focus></focus>Blank</blank-paragraph>
        </blank-note>
      </blank-page>
    `;

    const selection = host.selection.value[0] as TextSelection;
    expect(selection).toBeDefined();
    expect(selection.is(TextSelection)).toBe(true);
    expect(selection.from.blockId).toBe('paragraph-1');
    expect(selection.from.index).toBe(5);
    expect(selection.from.length).toBe(5);
    expect(selection.to).toBeNull();
  });
});
