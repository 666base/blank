import { isBlankBuild } from '@affine/core/utils/blank-links';
import { useI18n } from '@affine/i18n';
import { useMemo } from 'react';

const BLANK_GITHUB = 'https://github.com/666base/blank';

export const useNavConfig = () => {
  const t = useI18n();
  return useMemo(
    () =>
      isBlankBuild()
        ? [
            {
              title: t['com.affine.other-page.nav.github'](),
              path: BUILD_CONFIG.githubUrl || BLANK_GITHUB,
            },
            {
              title: t['com.affine.other-page.nav.releases'](),
              path: BUILD_CONFIG.changelogUrl || `${BLANK_GITHUB}/releases`,
            },
            {
              title: t['com.affine.other-page.nav.issues'](),
              path: `${BLANK_GITHUB}/issues`,
            },
          ]
        : [
            {
              title: t['com.affine.other-page.nav.official-website'](),
              path: BUILD_CONFIG.githubUrl || BLANK_GITHUB,
            },
            {
              title: t['com.affine.other-page.nav.blog'](),
              path:
                BUILD_CONFIG.changelogUrl || `${BLANK_GITHUB}/releases`,
            },
            {
              title: t['com.affine.other-page.nav.contact-us'](),
              path: BUILD_CONFIG.githubUrl || BLANK_GITHUB,
            },
          ],
    [t]
  );
};
