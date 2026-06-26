import { beforeEach, describe, expect, test, vi } from 'vitest';

import { applyBlankBranding, isBlankProduct } from '../blank-branding';

describe('blank-branding', () => {
  beforeEach(() => {
    vi.stubGlobal('BUILD_CONFIG', {
      githubUrl: 'https://github.com/666base/blank',
    });
  });

  test('isBlankProduct detects blank github url', () => {
    expect(isBlankProduct()).toBe(true);
  });

  test('applyBlankBranding replaces Blank and URLs', () => {
    expect(applyBlankBranding('Welcome to Blank Cloud')).toBe(
      'Welcome to Blank Cloud'
    );
    expect(applyBlankBranding('Visit https://blank.pro/terms')).toBe(
      'Visit https://github.com/666base/blank/terms'
    );
  });
});
