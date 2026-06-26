import type { AttachmentBlockModel } from '@blocksuite/blank/model';

export type AttachmentType = 'pdf' | 'image' | 'audio' | 'video' | 'unknown';

export type AttachmentViewerProps = {
  model: AttachmentBlockModel;
};

export type AttachmentViewerBaseProps = {
  model: AttachmentBlockModel;
  name: string;
  ext: string;
  size: string;
};
