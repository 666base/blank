/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest';

import { getLastBlockCommand } from '../../../commands/block-crud/get-last-content-block';
import { blank } from '../../../test-utils';

describe('commands/block-crud', () => {
  describe('getLastBlockCommand', () => {
    it('should return null when root is not exists', () => {
      const host = blank`<blank-page></blank-page>`;

      const [_, { lastBlock }] = host.command.exec(getLastBlockCommand, {
        role: 'content',
        root: undefined,
      });

      expect(lastBlock).toBeNull();
    });

    it('should return last block with content role when found', () => {
      const host = blank`
        <blank-page>
          <blank-note id="note-1">
            <blank-paragraph id="paragraph-1-1">First Paragraph</blank-paragraph>
            <blank-paragraph id="paragraph-1-2">Second Paragraph</blank-paragraph>
          </blank-note>
          <blank-note id="note-2">
            <blank-paragraph id="paragraph-2-1">First Paragraph</blank-paragraph>
            <blank-paragraph id="paragraph-2-2">Second Paragraph</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const [_, { lastBlock }] = host.command.exec(getLastBlockCommand, {
        role: 'hub',
        root: undefined,
      });

      expect(lastBlock?.id).toBe('note-2');
    });

    it('should return last block with any role in the array when found', () => {
      const host = blank`
        <blank-page>
          <blank-note id="note-1">
            <blank-paragraph id="paragraph-1-1">First Paragraph</blank-paragraph>
            <blank-paragraph id="paragraph-1-2">Second Paragraph</blank-paragraph>
          </blank-note>
          <blank-note id="note-2">
            <blank-paragraph id="paragraph-2-1">First Paragraph</blank-paragraph>
            <blank-paragraph id="paragraph-2-2">Second Paragraph</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const [_, { lastBlock }] = host.command.exec(getLastBlockCommand, {
        role: ['hub', 'content'],
        root: undefined,
      });

      expect(lastBlock?.id).toBe('note-2');
    });

    it('should return last block with specified flavour when found', () => {
      const host = blank`
        <blank-page>
          <blank-note id="note-1">
            <blank-paragraph id="paragraph-1">Paragraph</blank-paragraph>
            <blank-list id="list-1">List Item</blank-list>
          </blank-note>
        </blank-page>
      `;

      const note = host.store.getBlock('note-1')?.model;

      const [_, { lastBlock }] = host.command.exec(getLastBlockCommand, {
        flavour: 'blank:list',
        root: note,
      });

      expect(lastBlock?.id).toBe('list-1');
    });

    it('should return last block with any flavour in the array when found', () => {
      const host = blank`
        <blank-page>
          <blank-note id="note-1">
            <blank-paragraph id="paragraph-1">Paragraph</blank-paragraph>
            <blank-list id="list-1">List Item</blank-list>
          </blank-note>
        </blank-page>
      `;

      const note = host.store.getBlock('note-1')?.model;

      const [_, { lastBlock }] = host.command.exec(getLastBlockCommand, {
        flavour: ['blank:list', 'blank:code'],
        root: note,
      });

      expect(lastBlock?.id).toBe('list-1');
    });

    it('should return last block matching both role and flavour when both specified', () => {
      const host = blank`
        <blank-page>
          <blank-note id="note-1">
            <blank-paragraph id="paragraph-1">Content Paragraph</blank-paragraph>
            <blank-list id="list-1">Content List</blank-list>
            <blank-paragraph id="paragraph-2">hub Paragraph</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const note = host.store.getBlock('note-1')?.model;
      const [_, { lastBlock }] = host.command.exec(getLastBlockCommand, {
        role: 'content',
        flavour: 'blank:list',
        root: note,
      });

      expect(lastBlock?.id).toBe('list-1');
    });

    it('should return last block with default roles when role not specified', () => {
      const host = blank`
        <blank-page>
          <blank-note id="note-1">
            <blank-paragraph id="paragraph-1">hub Paragraph</blank-paragraph>
            <blank-paragraph id="paragraph-2">Content Paragraph</blank-paragraph>
            <blank-paragraph id="paragraph-3">Hub Paragraph</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const [_, { lastBlock }] = host.command.exec(getLastBlockCommand, {
        root: undefined,
      });

      expect(lastBlock?.id).toBe('note-1');
    });

    it('should return last block with specified role when found', () => {
      const host = blank`
        <blank-page>
          <blank-note id="note-1">
            <blank-paragraph id="paragraph-1">Content Paragraph</blank-paragraph>
            <blank-paragraph id="paragraph-2">hub Paragraph</blank-paragraph>
            <blank-database id="database-1">Database</blank-database>
          </blank-note>
        </blank-page>
      `;

      const note = host.store.getBlock('note-1')?.model;

      const [_, { lastBlock }] = host.command.exec(getLastBlockCommand, {
        role: 'hub',
        root: note,
      });

      expect(lastBlock?.id).toBe('database-1');
    });

    it('should return null when no blocks with specified role are found in children', () => {
      const host = blank`
        <blank-page>
          <blank-note id="note-1">
            <blank-paragraph id="paragraph-1">Content Paragraph</blank-paragraph>
            <blank-paragraph id="paragraph-2">Another Content Paragraph</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const note = host.store.getBlock('note-1')?.model;

      const [_, { lastBlock }] = host.command.exec(getLastBlockCommand, {
        role: 'hub',
        root: note,
      });

      expect(lastBlock).toBeNull();
    });

    it('should return null when no blocks with specified flavour are found in children', () => {
      const host = blank`
        <blank-page>
          <blank-note id="note-1">
            <blank-paragraph id="paragraph-1">Paragraph</blank-paragraph>
            <blank-paragraph id="paragraph-2">Another Paragraph</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const note = host.store.getBlock('note-1')?.model;

      const [_, { lastBlock }] = host.command.exec(getLastBlockCommand, {
        flavour: 'blank:list',
        root: note,
      });

      expect(lastBlock).toBeNull();
    });

    it('should return last block with specified role within specified root subtree', () => {
      const host = blank`
        <blank-page>
          <blank-note id="note-1">
            <blank-paragraph id="paragraph-1-1">1-1 Content</blank-paragraph>
            <blank-paragraph id="paragraph-1-2">1-2 hub</blank-paragraph>
          </blank-note>
          <blank-note id="note-2">
            <blank-paragraph id="paragraph-2-1">2-1 hub</blank-paragraph>
            <blank-paragraph id="paragraph-2-2">2-2 Content</blank-paragraph>
          </blank-note>
        </blank-page>
      `;

      const note = host.store.getBlock('note-2')?.model;

      const [_, { lastBlock }] = host.command.exec(getLastBlockCommand, {
        role: 'content',
        root: note,
      });

      expect(lastBlock?.id).toBe('paragraph-2-2');
    });
  });
});
