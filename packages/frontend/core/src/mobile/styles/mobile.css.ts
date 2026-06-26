import { cssVarV2 } from '@toeverything/theme/v2';
import { globalStyle } from '@vanilla-extract/css';

import { globalVars } from './variables.css';

globalStyle(':root', {
  vars: {
    [globalVars.appTabHeight]: BUILD_CONFIG.isIOS ? '49px' : '62px',
    [globalVars.appTabSafeArea]: `calc(${globalVars.appTabHeight} + env(safe-area-inset-bottom))`,
    '--blank-edgeless-zoom-toolbar-bottom': `calc(10px + ${globalVars.appTabSafeArea})`,
  },
});

globalStyle('#app-tabs, blank-keyboard-toolbar', {
  userSelect: 'none',
  WebkitUserSelect: 'none',
});

globalStyle(
  'rich-text, [contenteditable="true"], [contenteditable=""], .inline-editor',
  {
    userSelect: 'text',
    WebkitUserSelect: 'text',
  }
);

globalStyle('body', {
  height: 'auto',
  minHeight: '100dvh',
  overflowY: 'unset',
});
globalStyle('body:has(>#app-tabs):not(:has(blank-keyboard-toolbar))', {
  paddingBottom: globalVars.appTabSafeArea,
});
globalStyle('body:has(blank-keyboard-toolbar)', {
  paddingBottom: `calc(${globalVars.appKeyboardStaticHeight} + 46px)`,
});
globalStyle('body:has(>#app-tabs) edgeless-toolbar-widget', {
  bottom: globalVars.appTabSafeArea,
});

globalStyle('html', {
  height: '100dvh',
  overflowY: 'auto',
  background: cssVarV2('layer/background/secondary'),
});

globalStyle('a:focus', {
  outline: 'none',
});
globalStyle('button:focus', {
  outline: 'none',
});
