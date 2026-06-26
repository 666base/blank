import type {
  DialogComponentProps,
  WORKSPACE_DIALOG_SCHEMA,
} from '@blank/core/modules/dialogs';
import { isBlankBuild } from '@blank/core/utils/blank-links';
import { useI18n } from '@blank/i18n';

import { AboutGroup } from './about';
import { AppearanceGroup } from './appearance';
import { ExperimentalFeatureSetting } from './experimental';
import { BlankAccountGroup } from './blank-account';
import { SyncGroup } from './sync';
import * as styles from './style.css';
import { SwipeDialog } from './swipe-dialog';

const MobileSetting = () => {
  return (
    <div className={styles.root}>
      <AppearanceGroup />
      {isBlankBuild() ? <BlankAccountGroup /> : <SyncGroup />}
      <AboutGroup />
      <ExperimentalFeatureSetting />
    </div>
  );
};

export const SettingDialog = ({
  close,
}: DialogComponentProps<WORKSPACE_DIALOG_SCHEMA['setting']>) => {
  const t = useI18n();

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
