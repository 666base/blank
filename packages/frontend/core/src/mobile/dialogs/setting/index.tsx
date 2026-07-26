import type {
  DialogComponentProps,
  WORKSPACE_DIALOG_SCHEMA,
} from '@affine/core/modules/dialogs';
import { useI18n } from '@affine/i18n';

import { AboutGroup } from './about';
import { AppearanceGroup } from './appearance';
import { SettingGroup } from './group';
import { RowLayout } from './row.layout';
import * as styles from './style.css';
import { SwipeDialog } from './swipe-dialog';

const MobileSetting = () => {
  const t = useI18n();

  return (
    <div className={styles.root}>
      <AppearanceGroup />
      <SettingGroup title="Data & sync">
        <RowLayout label="Notes stay on this device. Use desktop Settings → Data & sync for folder backup or account sync." />
      </SettingGroup>
      <AboutGroup />
      <SettingGroup title={t['com.affine.mobile.setting.others.title']()}>
        <RowLayout
          label={t['com.affine.mobile.setting.others.github']()}
          href="https://github.com/666base/blank"
        />
      </SettingGroup>
    </div>
  );
};

export const SettingDialog = ({
  close,
}: DialogComponentProps<WORKSPACE_DIALOG_SCHEMA['setting']>) => {
  const t = useI18n();

  return (
    <SwipeDialog
      title={t['com.affine.mobile.setting.header-title']()}
      open
      onOpenChange={() => close()}
    >
      <MobileSetting />
    </SwipeDialog>
  );
};
