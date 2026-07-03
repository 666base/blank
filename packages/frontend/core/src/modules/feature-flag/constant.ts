import { isBlankBuild } from '../../utils/blank-links';

import type { FlagInfo } from './types';

// const isNotStableBuild = BUILD_CONFIG.appBuildType !== 'stable';
const isCanaryBuild = BUILD_CONFIG.appBuildType === 'canary';
const isLocalDesktop = BUILD_CONFIG.isElectron || BUILD_CONFIG.debug;
const isMobile = BUILD_CONFIG.isMobileEdition;
const isIOS = BUILD_CONFIG.isIOS;
const isAndroid = BUILD_CONFIG.isAndroid;

const BASE_BLANK_FLAGS = {
  enable_ai: {
    category: 'blank',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-ai.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-ai.description',
    hide: true,
    configurable: true,
    defaultState: false,
  },
  enable_ai_network_search: {
    category: 'blank',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-ai-network-search.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-ai-network-search.description',
    hide: true,
    configurable: false,
    defaultState: false,
  },
  enable_ai_playground: {
    category: 'blank',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-ai-model-switch.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-ai-model-switch.description',
    hide: true,
    configurable: false,
    defaultState: false,
  },
  enable_edgeless_text: {
    category: 'blocksuite',
    bsFlag: 'enable_edgeless_text',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-edgeless-text.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-edgeless-text.description',
    configurable: false,
    defaultState: true,
  },
  enable_color_picker: {
    category: 'blocksuite',
    bsFlag: 'enable_color_picker',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-color-picker.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-color-picker.description',
    configurable: false,
    defaultState: true,
  },
  enable_ai_chat_block: {
    category: 'blocksuite',
    bsFlag: 'enable_ai_chat_block',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-ai-chat-block.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-ai-chat-block.description',
    hide: true,
    configurable: false,
    defaultState: false,
  },
  enable_ai_onboarding: {
    category: 'blocksuite',
    bsFlag: 'enable_ai_onboarding',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-ai-onboarding.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-ai-onboarding.description',
    configurable: false,
    defaultState: false,
  },
  enable_mind_map_import: {
    category: 'blocksuite',
    bsFlag: 'enable_mind_map_import',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-mind-map-import.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-mind-map-import.description',
    configurable: false,
    defaultState: true,
  },
  enable_block_meta: {
    category: 'blocksuite',
    bsFlag: 'enable_block_meta',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-block-meta.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-block-meta.description',
    configurable: isCanaryBuild,
    defaultState: true,
  },

  enable_emoji_folder_icon: {
    category: 'blank',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-emoji-folder-icon.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-emoji-folder-icon.description',

    feedbackType: 'discord',
    feedbackLink:
      'https://discord.com/channels/959027316334407691/1280014319865696351/1280014319865696351',
    configurable: false,
    defaultState: true,
  },
  enable_emoji_doc_icon: {
    category: 'blank',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-emoji-doc-icon.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-emoji-doc-icon.description',
    feedbackType: 'discord',
    feedbackLink:
      'https://discord.com/channels/959027316334407691/1280014319865696351',
    configurable: false,
    defaultState: true,
  },
  enable_editor_settings: {
    category: 'blank',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-editor-settings.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-editor-settings.description',
    configurable: false,
    defaultState: true,
  },
  enable_theme_editor: {
    category: 'blank',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-theme-editor.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-theme-editor.description',
    configurable: (isCanaryBuild || isLocalDesktop) && !isMobile,
    defaultState: isCanaryBuild || isLocalDesktop,
  },
  enable_advanced_block_visibility: {
    category: 'blocksuite',
    bsFlag: 'enable_advanced_block_visibility',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-advanced-block-visibility.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-advanced-block-visibility.description',
    configurable: true,
    defaultState: isLocalDesktop,
  },
  enable_mobile_keyboard_toolbar: {
    category: 'blocksuite',
    bsFlag: 'enable_mobile_keyboard_toolbar',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-mobile-keyboard-toolbar.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-mobile-keyboard-toolbar.description',
    configurable: false,
    defaultState: false,
  },
  enable_mobile_linked_doc_menu: {
    category: 'blocksuite',
    bsFlag: 'enable_mobile_linked_doc_menu',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-mobile-linked-doc-menu.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-mobile-linked-doc-menu.description',
    configurable: false,
    defaultState: isMobile,
  },
  enable_mobile_edgeless_editing: {
    category: 'blank',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-mobile-edgeless-editing.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-mobile-edgeless-editing.description',
    configurable: isMobile,
    defaultState: isMobile,
  },
  enable_pdf_embed_preview: {
    category: 'blank',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-pdf-embed-preview.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-pdf-embed-preview.description',
    configurable: !isMobile,
    defaultState: false,
  },
  enable_editor_rtl: {
    category: 'blank',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-editor-rtl.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-editor-rtl.description',
    configurable: isCanaryBuild || isLocalDesktop,
    defaultState: false,
  },
  enable_mobile_ai_button: {
    category: 'blank',
    displayName: 'Enable AI Button',
    description: 'Enable AI Button on mobile',
    hide: true,
    configurable: false,
    defaultState: false,
  },
  enable_mermaid_wasm_native_renderer: {
    category: 'blank',
    displayName: 'Enable Native Mermaid Renderer',
    description:
      'Use the new Mermaid renderer backend. Web uses WASM, desktop uses native, and mobile always uses native. The native renderer is more than 10x faster, but its styling/aesthetic quality and the types of graphics it supports are not as good as the JS version.',
    configurable: !isIOS && !isAndroid,
    defaultState: false,
  },
  enable_turbo_renderer: {
    category: 'blocksuite',
    bsFlag: 'enable_turbo_renderer',
    displayName: 'Enable Turbo Renderer',
    description: 'Enable experimental edgeless turbo renderer',
    configurable: isCanaryBuild || isLocalDesktop,
    defaultState: isLocalDesktop,
  },
  enable_dom_renderer: {
    category: 'blocksuite',
    bsFlag: 'enable_dom_renderer',
    displayName: 'Enable DOM Renderer',
    description: 'Enable DOM renderer for graphics elements',
    configurable: true,
    defaultState: false,
  },
  enable_edgeless_scribbled_style: {
    category: 'blocksuite',
    bsFlag: 'enable_edgeless_scribbled_style',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-edgeless-scribbled-style.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-edgeless-scribbled-style.description',
    configurable: isCanaryBuild || isLocalDesktop,
    defaultState: isLocalDesktop,
  },
  enable_table_virtual_scroll: {
    category: 'blocksuite',
    bsFlag: 'enable_table_virtual_scroll',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-table-virtual-scroll.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-table-virtual-scroll.description',
    configurable: isCanaryBuild || isLocalDesktop,
    defaultState: isLocalDesktop,
  },
  enable_setting_subpage_animation: {
    category: 'blank',
    displayName: 'Enable Setting Subpage Animation',
    description: 'Apply animation for setting subpage open/close',
    configurable: isCanaryBuild || isLocalDesktop,
    defaultState: isLocalDesktop,
  },
  enable_adapter_panel: {
    category: 'blank',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-adapter-panel.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-adapter-panel.description',
    configurable: isCanaryBuild || isLocalDesktop,
    defaultState: isLocalDesktop,
  },
  enable_view_analytics_panel: {
    category: 'blank',
    displayName: 'Enable View Analytics Panel',
    description: 'Show the View analytics tab in the right sidebar.',
    configurable: true,
    defaultState: isLocalDesktop,
  },
  enable_two_step_journal_confirmation: {
    category: 'blank',
    displayName: 'Enable Two Step Journal Confirmation',
    description:
      'When enabled, you must confirm the journal before you can create a new journal.',
    configurable: isCanaryBuild,
    defaultState: isCanaryBuild,
  },
  enable_send_detailed_object_to_ai: {
    category: 'blank',
    displayName:
      'com.blank.settings.workspace.experimental-features.enable-ai-send-detailed-object.name',
    description:
      'com.blank.settings.workspace.experimental-features.enable-ai-send-detailed-object.description',
    hide: true,
    configurable: false,
    defaultState: false,
  },
  enable_battery_save_mode: {
    category: 'blank',
    displayName: 'Enable Battery Save Mode (Require Restart)',
    description:
      'Limit indexing and other compute-intensive tasks on this device, may experience longer loading time and latency in search and other features, in exchange for quietness.',
    configurable: true,
    defaultState: isMobile,
  },
  enable_mobile_database_editing: {
    category: 'blocksuite',
    bsFlag: 'enable_mobile_database_editing',
    displayName: 'Enable Mobile Database Editing',
    description: 'Enable mobile database editing',
    configurable: isMobile,
    defaultState: isLocalDesktop,
  },
  enable_pdfmake_export: {
    category: 'blocksuite',
    bsFlag: 'enable_pdfmake_export',
    displayName: 'Enable PDF Export',
    description:
      'Experimental export PDFs support, it may contain the wrong style.',
    configurable: true,
    defaultState: false,
  },
} satisfies { [key in string]: FlagInfo };

/** Stable defaults for Blank product builds — no experimental toggles in settings. */
const BLANK_STABLE_DEFAULT_OVERRIDES: Partial<
  Record<keyof typeof BASE_BLANK_FLAGS, boolean>
> = {
  enable_turbo_renderer: false,
  enable_dom_renderer: false,
  enable_edgeless_scribbled_style: false,
  enable_view_analytics_panel: false,
  enable_adapter_panel: false,
  enable_theme_editor: false,
  enable_advanced_block_visibility: false,
  enable_setting_subpage_animation: false,
  enable_pdf_embed_preview: false,
  enable_mermaid_wasm_native_renderer: false,
  enable_two_step_journal_confirmation: false,
  enable_pdfmake_export: false,
  enable_editor_rtl: false,
};

function applyBlankStableFlags(
  flags: typeof BASE_BLANK_FLAGS
): typeof BASE_BLANK_FLAGS {
  if (!isBlankBuild()) {
    return flags;
  }
  return Object.fromEntries(
    Object.entries(flags).map(([key, flag]) => {
      const stableDefault =
        BLANK_STABLE_DEFAULT_OVERRIDES[
          key as keyof typeof BASE_BLANK_FLAGS
        ];
      return [
        key,
        {
          ...flag,
          configurable: false,
          ...(stableDefault !== undefined
            ? { defaultState: stableDefault }
            : {}),
        },
      ];
    })
  ) as unknown as typeof BASE_BLANK_FLAGS;
}

export const BLANK_FLAGS = applyBlankStableFlags(BASE_BLANK_FLAGS);

// oxlint-disable-next-line no-redeclare
export type BLANK_FLAGS = typeof BASE_BLANK_FLAGS;
