import type { BlankTextAttributes } from '@blocksuite/blank-shared/types';
import {
  type InlineRootElement,
  InlineSpecExtension,
} from '@blocksuite/std/inline';
import type { ExtensionType } from '@blocksuite/store';
import { html } from 'lit';
import { z } from 'zod';

export type BlankInlineRootElement = InlineRootElement<BlankTextAttributes>;

export const BoldInlineSpecExtension =
  InlineSpecExtension<BlankTextAttributes>({
    name: 'bold',
    schema: z.object({
      bold: z.literal(true).optional().nullable().catch(undefined),
    }),
    match: delta => {
      return !!delta.attributes?.bold;
    },
    renderer: ({ delta }) => {
      return html`<blank-text .delta=${delta}></blank-text>`;
    },
  });

export const ItalicInlineSpecExtension =
  InlineSpecExtension<BlankTextAttributes>({
    name: 'italic',
    schema: z.object({
      italic: z.literal(true).optional().nullable().catch(undefined),
    }),
    match: delta => {
      return !!delta.attributes?.italic;
    },
    renderer: ({ delta }) => {
      return html`<blank-text .delta=${delta}></blank-text>`;
    },
  });

export const UnderlineInlineSpecExtension =
  InlineSpecExtension<BlankTextAttributes>({
    name: 'underline',
    schema: z.object({
      underline: z.literal(true).optional().nullable().catch(undefined),
    }),
    match: delta => {
      return !!delta.attributes?.underline;
    },
    renderer: ({ delta }) => {
      return html`<blank-text .delta=${delta}></blank-text>`;
    },
  });

export const StrikeInlineSpecExtension =
  InlineSpecExtension<BlankTextAttributes>({
    name: 'strike',
    schema: z.object({
      strike: z.literal(true).optional().nullable().catch(undefined),
    }),
    match: delta => {
      return !!delta.attributes?.strike;
    },
    renderer: ({ delta }) => {
      return html`<blank-text .delta=${delta}></blank-text>`;
    },
  });

export const CodeInlineSpecExtension =
  InlineSpecExtension<BlankTextAttributes>({
    name: 'inline-code',
    schema: z.object({
      code: z.literal(true).optional().nullable().catch(undefined),
    }),
    match: delta => {
      return !!delta.attributes?.code;
    },
    renderer: ({ delta }) => {
      return html`<blank-text .delta=${delta}></blank-text>`;
    },
  });

export const BackgroundInlineSpecExtension =
  InlineSpecExtension<BlankTextAttributes>({
    name: 'background',
    schema: z.object({
      background: z.string().optional().nullable().catch(undefined),
    }),
    match: delta => {
      return !!delta.attributes?.background;
    },
    renderer: ({ delta }) => {
      return html`<blank-text .delta=${delta}></blank-text>`;
    },
  });

export const ColorInlineSpecExtension =
  InlineSpecExtension<BlankTextAttributes>({
    name: 'color',
    schema: z.object({
      color: z.string().optional().nullable().catch(undefined),
    }),
    match: delta => {
      return !!delta.attributes?.color;
    },
    renderer: ({ delta }) => {
      return html`<blank-text .delta=${delta}></blank-text>`;
    },
  });

export const InlineSpecExtensions: ExtensionType[] = [
  BoldInlineSpecExtension,
  ItalicInlineSpecExtension,
  UnderlineInlineSpecExtension,
  StrikeInlineSpecExtension,
  CodeInlineSpecExtension,
  BackgroundInlineSpecExtension,
  ColorInlineSpecExtension,
];
