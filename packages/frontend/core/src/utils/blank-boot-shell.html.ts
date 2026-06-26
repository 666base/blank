/** Static instant shell — inlined in index.html (no network, shows before JS). */
export const BLANK_BOOT_SHELL_HTML = `<div id="blank-boot-shell" class="blank-boot-shell" aria-hidden="true">
  <div class="blank-boot-tabs">
    <img class="blank-boot-logo" src="/imgs/blank-app-icon.png" width="20" height="20" alt="" />
  </div>
  <div class="blank-boot-body">
    <aside class="blank-boot-sidebar">
      <div class="blank-boot-line blank-boot-line--lg"></div>
      <div class="blank-boot-line"></div>
      <div class="blank-boot-line"></div>
      <div class="blank-boot-line blank-boot-line--sm"></div>
      <div class="blank-boot-line"></div>
      <div class="blank-boot-line blank-boot-line--sm"></div>
    </aside>
    <main class="blank-boot-main">
      <div class="blank-boot-line blank-boot-line--title"></div>
      <div class="blank-boot-line"></div>
      <div class="blank-boot-line"></div>
      <div class="blank-boot-line blank-boot-line--short"></div>
    </main>
  </div>
</div>`;

/** Mobile: solid app background only — no cached doc preview before React. */
export const BLANK_BOOT_SHELL_MOBILE_HTML = `<div id="blank-boot-shell" class="blank-boot-shell blank-boot-shell--mobile" aria-hidden="true"></div>`;

export const BLANK_BOOT_SHELL_CSS = `
.blank-boot-shell{position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;background:#121212;color:#e8e8e8;font-family:system-ui,-apple-system,sans-serif;transition:opacity .12s ease}
.blank-boot-tabs{height:40px;flex-shrink:0;border-bottom:1px solid #2a2a2a;background:#161616;display:flex;align-items:center;padding:0 12px}
.blank-boot-logo{border-radius:4px;opacity:.92}
.blank-boot-body{flex:1;display:flex;min-height:0;overflow:hidden}
.blank-boot-sidebar{width:248px;flex-shrink:0;border-right:1px solid #2a2a2a;padding:14px 12px;display:flex;flex-direction:column;gap:10px;background:#141414}
.blank-boot-main{flex:1;padding:28px 32px;display:flex;flex-direction:column;gap:12px;background:#121212}
.blank-boot-line{height:14px;border-radius:6px;background:linear-gradient(90deg,#1e1e1e 0%,#262626 50%,#1e1e1e 100%);background-size:200% 100%;animation:blank-boot-shimmer 1.2s ease-in-out infinite}
.blank-boot-line--lg{height:28px;width:72%}
.blank-boot-line--title{height:28px;width:42%;margin-bottom:8px}
.blank-boot-line--short{width:55%}
.blank-boot-line--sm{width:80%;opacity:.75}
.blank-boot-cached-title{font-size:28px;font-weight:600;line-height:1.3;margin-bottom:12px;color:#e8e8e8;word-break:break-word}
.blank-boot-cached-preview{font-size:15px;line-height:1.65;color:#a8a8a8;white-space:pre-wrap;word-break:break-word;max-width:720px}
@keyframes blank-boot-shimmer{0%{background-position:100% 0}100%{background-position:-100% 0}}
`;

export const BLANK_BOOT_SHELL_MOBILE_CSS = `
.blank-boot-shell--mobile{background:#141414}
`;

export function getBlankBootShellHtml(isMobileEdition: boolean) {
  return isMobileEdition ? BLANK_BOOT_SHELL_MOBILE_HTML : BLANK_BOOT_SHELL_HTML;
}

export function getBlankBootShellCss(isMobileEdition: boolean) {
  return isMobileEdition
    ? `${BLANK_BOOT_SHELL_CSS}${BLANK_BOOT_SHELL_MOBILE_CSS}`
    : BLANK_BOOT_SHELL_CSS;
}
