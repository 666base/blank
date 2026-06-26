import { CommentInlineSpecExtension } from '@blocksuite/blank-inline-comment';
import { FootNoteInlineSpecExtension } from '@blocksuite/blank-inline-footnote';
import { LatexInlineSpecExtension } from '@blocksuite/blank-inline-latex';
import { LinkInlineSpecExtension } from '@blocksuite/blank-inline-link';
import { MentionInlineSpecExtension } from '@blocksuite/blank-inline-mention';
import { ReferenceInlineSpecExtension } from '@blocksuite/blank-inline-reference';
import type { BlankTextAttributes } from '@blocksuite/blank-shared/types';
import { InlineManagerExtension } from '@blocksuite/std/inline';

import {
  BackgroundInlineSpecExtension,
  BoldInlineSpecExtension,
  CodeInlineSpecExtension,
  ColorInlineSpecExtension,
  ItalicInlineSpecExtension,
  StrikeInlineSpecExtension,
  UnderlineInlineSpecExtension,
} from './inline-spec';

export const DefaultInlineManagerExtension =
  InlineManagerExtension<BlankTextAttributes>({
    id: 'DefaultInlineManager',
    specs: [
      BoldInlineSpecExtension.identifier,
      ItalicInlineSpecExtension.identifier,
      UnderlineInlineSpecExtension.identifier,
      StrikeInlineSpecExtension.identifier,
      CodeInlineSpecExtension.identifier,
      BackgroundInlineSpecExtension.identifier,
      ColorInlineSpecExtension.identifier,
      LatexInlineSpecExtension.identifier,
      ReferenceInlineSpecExtension.identifier,
      LinkInlineSpecExtension.identifier,
      FootNoteInlineSpecExtension.identifier,
      MentionInlineSpecExtension.identifier,
      CommentInlineSpecExtension.identifier,
    ],
  });
