/** Blank product: strip user-visible Blank / blank.pro branding from any string. */

export function isBlankProduct() {
  const url = BUILD_CONFIG.githubUrl ?? '';
  return url.includes('666base/blank') || url.includes('/blank');
}

const REPLACEMENTS: [RegExp, string][] = [
  [/Blank\s*AI/gi, 'Blank'],
  [/Blank\s*Cloud/gi, 'Blank Cloud'],
  [/Blank/g, 'Blank'],
  [/Blank\s*Cloud/gi, 'Blank Cloud'],
  [/Blank\s*Selfhost/gi, 'Blank Server'],
  [/Blank/g, 'Blank'],
  [/https?:\/\/ai\.blank\.pro[^\s"'<]*/gi, 'https://github.com/666base/blank'],
  [/https?:\/\/docs\.blank\.pro[^\s"'<]*/gi, 'https://github.com/666base/blank'],
  [/https?:\/\/(?:app|insider)\.blank\.pro[^\s"'<]*/gi, 'https://github.com/666base/blank'],
  [/https?:\/\/blank\.pro[^\s"'<]*/gi, 'https://github.com/666base/blank'],
  [/support@toeverything\.info/gi, 'https://github.com/666base/blank/issues'],
  [/toeverything\/Blank/gi, '666base/blank'],
  [/@666base/gi, '@666base'],
];

export function applyBlankBranding(text: string): string {
  if (!isBlankProduct() || !text) {
    return text;
  }
  let out = text;
  for (const [pattern, replacement] of REPLACEMENTS) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

export function applyBlankBrandingDeep<T>(data: T): T {
  if (!isBlankProduct() || data === null || data === undefined) {
    return data;
  }
  if (typeof data === 'string') {
    return applyBlankBranding(data) as T;
  }
  if (Array.isArray(data)) {
    return data.map(item => applyBlankBrandingDeep(item)) as T;
  }
  if (typeof data === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      out[key] = applyBlankBrandingDeep(value);
    }
    return out as T;
  }
  return data;
}
