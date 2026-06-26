import { type SlashMenuConfig } from '@blocksuite/blank-widget-slash-menu';

export const codeSlashMenuConfig: SlashMenuConfig = {
  disableWhen: ({ model }) => {
    return model.flavour === 'blank:code';
  },
  items: [],
};
