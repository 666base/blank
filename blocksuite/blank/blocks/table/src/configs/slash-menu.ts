import { getSelectedModelsCommand } from '@blocksuite/blank-shared/commands';
import { TelemetryProvider } from '@blocksuite/blank-shared/services';
import { isInsideBlockByFlavour } from '@blocksuite/blank-shared/utils';
import type { SlashMenuConfig } from '@blocksuite/blank-widget-slash-menu';
import { TableIcon } from '@blocksuite/icons/lit';

import { insertTableBlockCommand } from '../commands';
import { tableTooltip } from './tooltips';

export const tableSlashMenuConfig: SlashMenuConfig = {
  disableWhen: ({ model }) => model.flavour === 'blank:table',
  items: [
    {
      name: 'Table',
      description: 'Create a simple table.',
      icon: TableIcon(),
      tooltip: {
        figure: tableTooltip,
        caption: 'Table',
      },
      group: '4_Content & Media@0',
      when: ({ model }) =>
        !isInsideBlockByFlavour(model.store, model, 'blank:edgeless-text'),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertTableBlockCommand, {
            place: 'after',
            removeEmptyLine: true,
          })
          .pipe(({ insertedTableBlockId }) => {
            if (insertedTableBlockId) {
              const telemetry = std.getOptional(TelemetryProvider);
              telemetry?.track('BlockCreated', {
                blockType: 'blank:table',
              });
            }
          })
          .run();
      },
    },
  ],
};
