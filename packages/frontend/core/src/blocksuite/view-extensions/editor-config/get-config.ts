import {
  createCustomToolbarExtension,
  createToolbarMoreMenuConfig,
} from '@blank/core/blocksuite/view-extensions/editor-config/toolbar';
import { WorkspaceServerService } from '@blank/core/modules/cloud';
import { EditorSettingService } from '@blank/core/modules/editor-setting';
import { ToolbarMoreMenuConfigExtension } from '@blocksuite/blank/components/toolbar';
import { EditorSettingExtension } from '@blocksuite/blank/shared/services';
import type { ExtensionType } from '@blocksuite/store';
import type { FrameworkProvider } from '@toeverything/infra';

export function getEditorConfigExtension(
  framework: FrameworkProvider
): ExtensionType[] {
  const editorSettingService = framework.get(EditorSettingService);
  const workspaceServerService = framework.get(WorkspaceServerService);
  const baseUrl = workspaceServerService.server?.baseUrl ?? location.origin;

  return [
    EditorSettingExtension({
      // eslint-disable-next-line rxjs/finnish
      setting$: editorSettingService.editorSetting.settingSignal,
      set: (k, v) => editorSettingService.editorSetting.set(k, v),
    }),
    ToolbarMoreMenuConfigExtension(createToolbarMoreMenuConfig(framework)),

    createCustomToolbarExtension(editorSettingService.editorSetting, baseUrl),
  ].flat();
}
