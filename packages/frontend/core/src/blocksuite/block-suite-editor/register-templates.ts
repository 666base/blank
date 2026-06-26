import { builtInTemplates as builtInEdgelessTemplates } from '@blank/templates/edgeless';
import { builtInTemplates as builtInStickersTemplates } from '@blank/templates/stickers';
import {
  EdgelessTemplatePanel,
  type TemplateManager,
} from '@blocksuite/blank/gfx/template';

export function registerTemplates() {
  EdgelessTemplatePanel.templates.extend(
    builtInStickersTemplates as TemplateManager
  );
  EdgelessTemplatePanel.templates.extend(
    builtInEdgelessTemplates as TemplateManager
  );
}
