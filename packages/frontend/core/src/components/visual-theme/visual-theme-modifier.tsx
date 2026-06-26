import { useLayoutEffect } from 'react';

/** Codex is the only visual theme — always applied. */
export function applyVisualTheme() {
  document.documentElement.dataset.visualTheme = 'codex';
}

/** Call before React mounts to avoid a flash of the wrong visual theme. */
export function seedVisualThemeFromStorage() {
  applyVisualTheme();
}

export const VisualThemeModifier = () => {
  useLayoutEffect(() => {
    applyVisualTheme();
  }, []);

  return null;
};
