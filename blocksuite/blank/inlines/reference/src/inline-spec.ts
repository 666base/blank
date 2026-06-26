import { ReferenceInfoSchema } from '@blocksuite/blank-model';
import type { BlankTextAttributes } from '@blocksuite/blank-shared/types';
import { StdIdentifier } from '@blocksuite/std';
import { InlineSpecExtension } from '@blocksuite/std/inline';
import { html } from 'lit';
import { z } from 'zod';

import {
  ReferenceNodeConfigExtension,
  ReferenceNodeConfigProvider,
} from './reference-node/reference-config';

export const ReferenceInlineSpecExtension =
  InlineSpecExtension<BlankTextAttributes>('reference', provider => {
    const std = provider.get(StdIdentifier);
    const configProvider = new ReferenceNodeConfigProvider(std);
    const config =
      provider.getOptional(ReferenceNodeConfigExtension.identifier) ?? {};
    if (config.customContent) {
      configProvider.setCustomContent(config.customContent);
    }
    if (config.interactable !== undefined) {
      configProvider.setInteractable(config.interactable);
    }
    if (config.hidePopup !== undefined) {
      configProvider.setHidePopup(config.hidePopup);
    }
    return {
      name: 'reference',
      schema: z.object({
        reference: z
          .object({
            type: z.enum([
              // @deprecated Subpage is deprecated, use LinkedPage instead
              'Subpage',
              'LinkedPage',
            ]),
          })
          .merge(ReferenceInfoSchema)
          .optional()
          .nullable()
          .catch(undefined),
      }),
      match: delta => {
        return !!delta.attributes?.reference;
      },
      renderer: ({ delta, selected }) => {
        return html`<blank-reference
          .std=${std}
          .delta=${delta}
          .selected=${selected}
          .config=${configProvider}
        ></blank-reference>`;
      },
      embed: true,
    };
  });
