import { useI18n } from '@affine/i18n';
import { useMemo } from 'react';

export const useNavConfig = () => {
  const t = useI18n();
  return useMemo(
    () => [
      {
        title: t['com.affine.other-page.nav.official-website'](),
        path: BUILD_CONFIG.githubUrl || 'https://github.com/666base/blank',
      },
      {
        title: t['com.affine.other-page.nav.blog'](),
        path: BUILD_CONFIG.changelogUrl || 'https://github.com/666base/blank/releases',
      },
      {
        title: t['com.affine.other-page.nav.contact-us'](),
        path: BUILD_CONFIG.githubUrl || 'https://github.com/666base/blank',
      },
    ],
    [t]
  );
};
