import type { TranscriptionBlockModel } from '@blank/core/blocksuite/ai/blocks/transcription-block/model';

/** Blank builds do not render AI transcription UI. */
export const TranscriptionBlock = (_props: {
  block: TranscriptionBlockModel;
}) => null;
