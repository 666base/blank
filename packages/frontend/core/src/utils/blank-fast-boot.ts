import { getWorkspaceDocPath } from '../desktop/route-paths';
import { BLANK_DOC_SNAPSHOT_PREFIX } from './blank-doc-snapshot';
import { isBlankBuild } from './blank-links';

export const BLANK_INSTANT_WORKSPACE_ID = 'blank-default';
export const BLANK_INSTANT_WORKSPACE_FLAVOUR = 'local';

const LAST_WORKSPACE_KEY = 'last_workspace_id';
const LAST_PAGE_KEY = 'last_page_id';
const LAST_FLAVOUR_KEY = 'last_workspace_flavour';

export function isInstantBootEnabled() {
  return isBlankBuild();
}

function getInstantDefaultView() {
  return BUILD_CONFIG.isMobileEdition ? 'home' : 'all';
}

/** Seed localStorage so inline boot script can redirect before React loads. */
export function seedInstantBootStorage() {
  if (!isInstantBootEnabled()) {
    return;
  }
  try {
    if (!globalThis.localStorage?.getItem(LAST_WORKSPACE_KEY)) {
      globalThis.localStorage?.setItem(
        LAST_WORKSPACE_KEY,
        BLANK_INSTANT_WORKSPACE_ID
      );
      globalThis.localStorage?.setItem(
        LAST_FLAVOUR_KEY,
        BLANK_INSTANT_WORKSPACE_FLAVOUR
      );
    }
  } catch {
    // ignore
  }
}

type ElectronApis = {
  fastBoot?: {
    setRoute: (data: {
      workspaceId: string;
      pageId: string | null;
      flavour?: string | null;
    }) => Promise<void>;
  };
};

export type FastBootRoute = {
  workspaceId: string;
  pageId: string | null;
  flavour: string | null;
};

/** Cached workspace metadata for instant reopen before the list revalidates. */
export function getOptimisticWorkspaceMeta(
  workspaceId: string | undefined
): { id: string; flavour: string } | null {
  if (!workspaceId) {
    return null;
  }
  if (
    isInstantBootEnabled() &&
    workspaceId === BLANK_INSTANT_WORKSPACE_ID
  ) {
    return {
      id: workspaceId,
      flavour: BLANK_INSTANT_WORKSPACE_FLAVOUR,
    };
  }
  try {
    const lastId = globalThis.localStorage?.getItem(LAST_WORKSPACE_KEY);
    if (lastId !== workspaceId) {
      return null;
    }
    return {
      id: workspaceId,
      flavour:
        globalThis.localStorage?.getItem(LAST_FLAVOUR_KEY) ?? 'local',
    };
  } catch {
    return null;
  }
}

/** Last opened workspace + page (for instant reopen). */
export function getFastBootPath(): string | null {
  try {
    seedInstantBootStorage();
    const workspaceId = globalThis.localStorage?.getItem(LAST_WORKSPACE_KEY);
    if (!workspaceId) {
      return null;
    }
    const pageId = globalThis.localStorage?.getItem(LAST_PAGE_KEY);
    if (pageId) {
      return getWorkspaceDocPath(workspaceId, pageId);
    }
    return `/workspace/${workspaceId}/${getInstantDefaultView()}`;
  } catch {
    return null;
  }
}

/** Route for cold start — always defined on Blank builds (incl. first open). */
export function getInstantBootPath(): string | null {
  if (!isInstantBootEnabled()) {
    return getFastBootPath();
  }
  return (
    getFastBootPath() ??
    `/workspace/${BLANK_INSTANT_WORKSPACE_ID}/${getInstantDefaultView()}`
  );
}

/** Remember route for next cold start (localStorage + Electron userData file). */
export function persistFastBootRoute(
  workspaceId: string,
  pageId?: string | null,
  flavour?: string | null
) {
  try {
    globalThis.localStorage?.setItem(LAST_WORKSPACE_KEY, workspaceId);
    if (pageId) {
      globalThis.localStorage?.setItem(LAST_PAGE_KEY, pageId);
    }
    if (flavour) {
      globalThis.localStorage?.setItem(LAST_FLAVOUR_KEY, flavour);
    }
    const apis = (globalThis as { __apis?: ElectronApis }).__apis;
    void apis?.fastBoot?.setRoute({
      workspaceId,
      pageId: pageId ?? null,
      flavour: flavour ?? null,
    });
  } catch {
    // ignore
  }
}

export function removeBootSplash() {
  const el =
    document.getElementById('blank-boot-shell') ??
    document.getElementById('blank-boot-splash');
  if (!el) {
    return;
  }
  el.style.opacity = '0';
  el.style.pointerEvents = 'none';
  window.setTimeout(() => el.remove(), 120);
}

/** Let the app receive input even while React is still on a loading fallback. */
export function prepareBootShellForApp() {
  const el =
    document.getElementById('blank-boot-shell') ??
    document.getElementById('blank-boot-splash');
  if (!el) {
    return;
  }
  el.style.pointerEvents = 'none';
}

/** Fade boot shell only after the real layout has painted underneath. */
export function scheduleRemoveBootSplash() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      removeBootSplash();
    });
  });
}

/** Inline script for index.html — runs before JS bundles parse. */
export function getBlankFastBootInlineScript(
  defaultView: 'home' | 'all' = 'all'
) {
  const snapPrefix = BLANK_DOC_SNAPSHOT_PREFIX;
  return `(function(){try{var INSTANT="${BLANK_INSTANT_WORKSPACE_ID}";var FLAVOUR="${BLANK_INSTANT_WORKSPACE_FLAVOUR}";var SNAP="${snapPrefix}";var w=localStorage.getItem("last_workspace_id");if(!w){w=INSTANT;localStorage.setItem("last_workspace_id",w);localStorage.setItem("last_workspace_flavour",FLAVOUR);}var p=localStorage.getItem("last_page_id");var view=${JSON.stringify(defaultView)};var path=p?"/workspace/"+w+"/"+p:"/workspace/"+w+"/"+view;var base=(document.querySelector('meta[name="env:publicPath"]')||{}).content||"/";if(base&&base!=="/"){path=base.replace(/\\/$/,"")+path;}var pn=location.pathname;if(pn==="/"||pn==="/index.html"||pn.endsWith("/index.html")){history.replaceState(null,"",path);}function hydrate(){try{if(!p)return;var raw=localStorage.getItem(SNAP+w+":"+p);if(!raw)return;var snap=JSON.parse(raw);var main=document.querySelector(".blank-boot-mobile-main")||document.querySelector(".blank-boot-main");if(!main||!snap)return;main.innerHTML="";if(snap.title){var h=document.createElement("div");h.className="blank-boot-cached-title";h.textContent=snap.title;main.appendChild(h);}if(snap.preview){var t=document.createElement("div");t.className="blank-boot-cached-preview";t.textContent=snap.preview;main.appendChild(t);}}catch(e){}}if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",hydrate);}else{hydrate();}}catch(e){}})();`;
}

/** @deprecated Use getBlankFastBootInlineScript() from html build with correct view. */
export const BLANK_FAST_BOOT_INLINE_SCRIPT = getBlankFastBootInlineScript('all');
