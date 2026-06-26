import type {
  DialogComponentProps,
  WORKSPACE_DIALOG_SCHEMA,
} from '@blank/core/modules/dialogs';
import { isBlankBuild } from '@blank/core/utils/blank-links';
import { useI18n } from '@blank/i18n';
import { useLayoutEffect } from 'react';

import { AboutGroup } from './about';
import { AppearanceGroup } from './appearance';
import { ExperimentalFeatureSetting } from './experimental';
import { BlankAccountGroup } from './blank-account';
import { SidebarSectionsGroup } from './sidebar-sections';
import { SyncGroup } from './sync';
import * as styles from './style.css';
import { SwipeDialog } from './swipe-dialog';

const MobileSetting = () => {
  return (
    <div className={styles.root}>
      <AppearanceGroup />
      {isBlankBuild() ? null : <SidebarSectionsGroup />}
      {isBlankBuild() ? <BlankAccountGroup /> : <SyncGroup />}
      <AboutGroup />
      {isBlankBuild() ? null : <ExperimentalFeatureSetting />}
    </div>
  );
};

export const SettingDialog = ({
  close,
  scrollAnchor,
}: DialogComponentProps<WORKSPACE_DIALOG_SCHEMA['setting']>) => {
  const t = useI18n();

  useLayoutEffect(() => {
    if (!scrollAnchor) {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(scrollAnchor)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [scrollAnchor]);

  return (
    <SwipeDialog
      title={t['com.blank.mobile.setting.header-title']()}
      open
      onOpenChange={() => close()}
    >
      <MobileSetting />
    </SwipeDialog>
  );

  // return (
  //   <ConfigModal
  //     title={t['com.blank.mobile.setting.header-title']()}
  //     open
  //     onOpenChange={() => close()}
  //     onBack={close}
  //   >
  //     <MobileSetting />
  //   </ConfigModal>
  // );
};
