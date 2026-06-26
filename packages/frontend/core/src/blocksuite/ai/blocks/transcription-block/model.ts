import type {
  TranscriptionQualityInput,
  TranscriptionSourceAudioInput,
} from '@blank/graphql';
import {
  BlockModel,
  BlockSchemaExtension,
  defineBlockSchema,
} from '@blocksuite/blank/store';

export const TranscriptionBlockFlavour = 'blank:transcription';

const defaultProps: TranscriptionBlockProps = {
  transcription: {},
  jobId: undefined,
  createdBy: undefined, // the user id of the creator
};

export const TranscriptionBlockSchema = defineBlockSchema({
  flavour: TranscriptionBlockFlavour,
  props: () => defaultProps,
  metadata: {
    version: 1,
    role: 'attachment-viewer',
    parent: ['blank:attachment'],
    children: ['blank:callout'],
  },
  toModel: () => new TranscriptionBlockModel(),
});

export type TranscriptionBlockProps = {
  transcription: {
    sourceAudio?: TranscriptionSourceAudioInput;
    quality?: TranscriptionQualityInput;
  };
  jobId?: string;
  createdBy?: string;
};

export class TranscriptionBlockModel extends BlockModel<TranscriptionBlockProps> {}

export const TranscriptionBlockSchemaExtension = BlockSchemaExtension(
  TranscriptionBlockSchema
);
