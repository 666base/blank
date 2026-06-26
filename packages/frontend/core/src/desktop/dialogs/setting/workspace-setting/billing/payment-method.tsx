import { Button, notify } from '@blank/component';
import { SettingRow } from '@blank/component/setting-components';
import { useAsyncCallback } from '@blank/core/components/hooks/blank-async-hooks';
import { useMutation } from '@blank/core/components/hooks/use-mutation';
import { UrlService } from '@blank/core/modules/url';
import { UserFriendlyError } from '@blank/error';
import { createCustomerPortalMutation } from '@blank/graphql';
import { useI18n } from '@blank/i18n';
import { useService } from '@toeverything/infra';

import * as styles from './styles.css';

export const PaymentMethodUpdater = () => {
  const { isMutating, trigger } = useMutation({
    mutation: createCustomerPortalMutation,
  });
  const urlService = useService(UrlService);
  const t = useI18n();

  const update = useAsyncCallback(async () => {
    await trigger(null, {
      onSuccess: data => {
        urlService.openExternal(data.createCustomerPortal);
      },
    }).catch(e => {
      const userFriendlyError = UserFriendlyError.fromAny(e);
      notify.error(userFriendlyError);
    });
  }, [trigger, urlService]);

  return (
    <SettingRow
      className={styles.paymentMethod}
      name={t['com.blank.payment.billing-setting.payment-method']()}
      desc={t[
        'com.blank.payment.billing-setting.payment-method.description'
      ]()}
    >
      <Button onClick={update} loading={isMutating} disabled={isMutating}>
        {t['com.blank.payment.billing-setting.payment-method.go']()}
      </Button>
    </SettingRow>
  );
};
