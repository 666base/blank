let meta: HTMLMetaElement | null = null;
let nativeStatusBarSync: ((color: string) => void) | null = null;

export function registerNativeStatusBarSync(
  handler: ((color: string) => void) | null
) {
  nativeStatusBarSync = handler;
}

function getMeta() {
  if (meta) return meta;

  const exists = document.querySelector('meta[name="theme-color"]');
  if (exists) {
    meta = exists as HTMLMetaElement;
    return meta;
  }

  meta = document.createElement('meta');
  meta.name = 'theme-color';
  document.head.append(meta);
  return meta;
}

export type Rgba = { r: number; g: number; b: number; a: number };

export function parseRgba(color: string): Rgba | null {
  if (!color || color === 'transparent') {
    return null;
  }

  const hex = color.trim();
  if (hex.startsWith('#')) {
    const raw = hex.slice(1);
    if (raw.length === 3) {
      return {
        r: parseInt(raw[0] + raw[0], 16),
        g: parseInt(raw[1] + raw[1], 16),
        b: parseInt(raw[2] + raw[2], 16),
        a: 1,
      };
    }
    if (raw.length === 6) {
      return {
        r: parseInt(raw.slice(0, 2), 16),
        g: parseInt(raw.slice(2, 4), 16),
        b: parseInt(raw.slice(4, 6), 16),
        a: 1,
      };
    }
    if (raw.length === 8) {
      return {
        r: parseInt(raw.slice(2, 4), 16),
        g: parseInt(raw.slice(4, 6), 16),
        b: parseInt(raw.slice(6, 8), 16),
        a: parseInt(raw.slice(0, 2), 16) / 255,
      };
    }
  }

  const match = color.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/
  );
  if (!match) {
    return null;
  }

  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
    a: match[4] === undefined ? 1 : Number(match[4]),
  };
}

export function colorToHex(color: string): string {
  const parsed = parseRgba(color);
  if (!parsed) {
    return color.startsWith('#') ? color : '#141414';
  }

  const toHex = (value: number) =>
    Math.round(Math.max(0, Math.min(255, value)))
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(parsed.r)}${toHex(parsed.g)}${toHex(parsed.b)}`;
}

export function getRelativeLuminance(color: string): number {
  const parsed = parseRgba(color);
  if (!parsed) {
    return 0;
  }

  const channel = (value: number) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };

  return (
    0.2126 * channel(parsed.r) +
    0.7152 * channel(parsed.g) +
    0.0722 * channel(parsed.b)
  );
}

export function getElementBackgroundColor(element: Element): string | null {
  const style = getComputedStyle(element);
  const background = style.backgroundColor;
  const parsed = parseRgba(background);
  if (parsed && parsed.a > 0.05) {
    return background;
  }

  const cssRoot = style.getPropertyValue('--bg-root').trim();
  if (cssRoot && cssRoot !== 'transparent') {
    return cssRoot;
  }

  return null;
}

export function getRootThemeBackground(): string | null {
  return getElementBackgroundColor(document.documentElement);
}

export function findOpaqueBackground(start: Element | null): string | null {
  let element: Element | null = start;
  while (element) {
    const background = getElementBackgroundColor(element);
    if (background) {
      return background;
    }
    if (element === document.documentElement) {
      break;
    }
    element = element.parentElement;
  }

  return getRootThemeBackground();
}

export function getEffectiveBackgroundColor(
  start: Element | null,
  fallback?: string
): string {
  const found = findOpaqueBackground(start);
  if (found) {
    return found;
  }

  if (fallback) {
    return fallback;
  }

  return getRootThemeBackground() ?? '#141414';
}

export function sampleStatusBarColor(fallback: string): string {
  const x = Math.round(window.innerWidth / 2);
  const sampleYs = [2, 8, 16, 28, 44, 64];

  for (const y of sampleYs) {
    if (y >= window.innerHeight) {
      continue;
    }

    const elements = document.elementsFromPoint(x, y);
    for (const element of elements) {
      if (
        element === document.documentElement ||
        element === document.body ||
        element.id === 'blank-boot-shell' ||
        element.id === 'blank-boot-splash'
      ) {
        continue;
      }

      const color = findOpaqueBackground(element);
      if (color) {
        return color;
      }
    }
  }

  return getRootThemeBackground() ?? fallback;
}

export function applyStatusBarColor(
  color: string,
  options?: { trackForRestore?: boolean }
) {
  const themeMeta = getMeta();
  const previousMeta = themeMeta.content;
  const previousBackground = document.documentElement.style.backgroundColor;
  const hex = colorToHex(color);

  themeMeta.content = hex;
  document.documentElement.style.backgroundColor = color;
  nativeStatusBarSync?.(hex);

  if (options?.trackForRestore) {
    return () => {
      themeMeta.content = previousMeta;
      document.documentElement.style.backgroundColor = previousBackground;
      if (previousMeta) {
        nativeStatusBarSync?.(previousMeta);
      }
    };
  }
}
