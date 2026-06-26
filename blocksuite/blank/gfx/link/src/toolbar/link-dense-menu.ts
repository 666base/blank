import { insertLinkByQuickSearchCommand } from '@blocksuite/blank-block-bookmark';
import { menu } from '@blocksuite/blank-components/context-menu';
import { LinkIcon } from '@blocksuite/blank-components/icons';
import { TelemetryProvider } from '@blocksuite/blank-shared/services';
import type { DenseMenuBuilder } from '@blocksuite/blank-widget-edgeless-toolbar';

export const buildLinkDenseMenu: DenseMenuBuilder = edgeless =>
  menu.action({
    name: 'Link',
    prefix: LinkIcon,
    select: () => {
      const [_, { insertedLinkType }] = edgeless.std.command.exec(
        insertLinkByQuickSearchCommand
      );

      insertedLinkType
        ?.then(type => {
          const flavour = type?.flavour;
          if (!flavour) return;

          edgeless.std
            .getOptional(TelemetryProvider)
            ?.track('CanvasElementAdded', {
              control: 'toolbar:general',
              page: 'whiteboard editor',
              module: 'toolbar',
              type: flavour.split(':')[1],
            });
        })
        .catch(console.error);
    },
  });
