import { isBlankBuild } from '@blank/core/utils/blank-links';
import { useI18n } from '@blank/i18n';
import { useMemo } from 'react';

const BLANK_GITHUB = 'https://github.com/666base/blank';

export const useNavConfig = () => {
  const t = useI18n();
  return useMemo(
    () =>
      isBlankBuild()
        ? []
        : [
            {
              title: t['com.blank.other-page.nav.official-website'](),
              path: BUILD_CONFIG.githubUrl || BLANK_GITHUB,
            },
            {
              title: t['com.blank.other-page.nav.blog'](),
              path:
                BUILD_CONFIG.changelogUrl || `${BLANK_GITHUB}/releases`,
            },
            {
              title: t['com.blank.other-page.nav.contact-us'](),
              path: BUILD_CONFIG.githubUrl || BLANK_GITHUB,
            },
          ],
    [t]
  );
};
