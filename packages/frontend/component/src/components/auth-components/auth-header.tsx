import { Logo1Icon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import type { FC } from 'react';

import { BlankAppLogo, isBlankBranding } from '@blank/core/utils/blank-branding';
import { authHeaderWrapper } from './share.css';

export const AuthHeader: FC<{
  title: string;
  subTitle?: string;
  className?: string;
}> = ({ title, subTitle, className }) => {
  return (
    <div className={clsx(authHeaderWrapper, className)}>
      <p>
        {isBlankBranding() ? (
          <BlankAppLogo size={24} className="logo" />
        ) : (
          <Logo1Icon className="logo" />
        )}
        {title}
      </p>
      <p>{subTitle}</p>
    </div>
  );
};
