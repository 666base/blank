const MOBILE_BOOT_SHELL_HTML = `<div id="blank-boot-shell" class="blank-boot-shell" aria-hidden="true">
  <div class="blank-boot-mobile">
    <div class="blank-boot-mobile-top">
      <div class="blank-boot-shimmer blank-boot-icon"></div>
      <div class="blank-boot-shimmer blank-boot-icon"></div>
      <div class="blank-boot-shimmer blank-boot-icon"></div>
      <div class="blank-boot-shimmer blank-boot-icon"></div>
    </div>
    <div class="blank-boot-mobile-tabs">
      <div class="blank-boot-shimmer blank-boot-tab blank-boot-tab--active"></div>
      <div class="blank-boot-shimmer blank-boot-tab"></div>
      <div class="blank-boot-shimmer blank-boot-tab"></div>
    </div>
    <div class="blank-boot-mobile-content">
      <div class="blank-boot-shimmer blank-boot-line blank-boot-line--lg"></div>
      <div class="blank-boot-shimmer blank-boot-card"></div>
      <div class="blank-boot-shimmer blank-boot-card"></div>
      <div class="blank-boot-shimmer blank-boot-line"></div>
      <div class="blank-boot-shimmer blank-boot-line blank-boot-line--sm"></div>
      <div class="blank-boot-shimmer blank-boot-line"></div>
    </div>
    <div class="blank-boot-mobile-navbar">
      <div class="blank-boot-shimmer blank-boot-nav-icon blank-boot-nav-icon--active"></div>
      <div class="blank-boot-shimmer blank-boot-nav-icon"></div>
      <div class="blank-boot-shimmer blank-boot-nav-icon"></div>
    </div>
  </div>
</div>`;

const DESKTOP_BOOT_SHELL_HTML = `<div id="blank-boot-shell" class="blank-boot-shell" aria-hidden="true"></div>`;

const BOOT_SHELL_BASE_CSS = `
html,body{margin:0;background:#141414}
#app{min-height:100dvh;background:#141414}
.blank-boot-shell{position:fixed;inset:0;z-index:99999;background:#141414;pointer-events:none}
@keyframes blank-boot-shimmer{0%{opacity:.45}50%{opacity:.9}100%{opacity:.45}}
.blank-boot-shimmer{animation:blank-boot-shimmer 1.2s ease-in-out infinite;background:#2a2a2a;border-radius:8px}
`;

const MOBILE_BOOT_SHELL_CSS = `
.blank-boot-mobile{height:100dvh;display:flex;flex-direction:column;background:#141414;padding:env(safe-area-inset-top) 0 env(safe-area-inset-bottom)}
.blank-boot-mobile-top{display:flex;justify-content:flex-end;align-items:center;gap:8px;padding:8px 16px 4px;min-height:44px}
.blank-boot-icon{width:40px;height:40px;border-radius:10px}
.blank-boot-mobile-tabs{display:flex;gap:10px;padding:4px 16px 12px}
.blank-boot-tab{height:34px;width:72px;border-radius:999px}
.blank-boot-tab--active{width:84px;background:#333}
.blank-boot-mobile-content{flex:1;padding:0 16px 16px;display:flex;flex-direction:column;gap:12px}
.blank-boot-line{height:16px;width:100%}
.blank-boot-line--lg{width:42%;height:18px}
.blank-boot-line--sm{width:58%}
.blank-boot-card{height:88px;width:100%;border-radius:12px}
.blank-boot-mobile-navbar{display:flex;justify-content:space-between;align-items:center;padding:13px 16px;border-top:.5px solid #2a2a2a}
.blank-boot-nav-icon{width:30px;height:30px;border-radius:8px}
.blank-boot-nav-icon--active{background:#333}
`;

/** Static instant shell — inlined in index.html (no network, shows before JS bundles load). */
export const BLANK_BOOT_SHELL_HTML = DESKTOP_BOOT_SHELL_HTML;

export const BLANK_BOOT_SHELL_CSS = `${BOOT_SHELL_BASE_CSS}`;

export function getBlankBootShellHtml(isMobileEdition: boolean) {
  return isMobileEdition ? MOBILE_BOOT_SHELL_HTML : DESKTOP_BOOT_SHELL_HTML;
}

export function getBlankBootShellCss(isMobileEdition: boolean) {
  return isMobileEdition
    ? `${BOOT_SHELL_BASE_CSS}${MOBILE_BOOT_SHELL_CSS}`
    : BOOT_SHELL_BASE_CSS;
}
