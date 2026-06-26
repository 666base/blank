import { SettingRow } from '@blank/component/setting-components';
import { Button } from '@blank/component/ui/button';
import { getUpgradeQuestionnaireLink } from '@blank/core/components/hooks/blank/use-subscription-notify';
import { AuthService, SubscriptionService } from '@blank/core/modules/cloud';
import { SubscriptionPlan, SubscriptionRecurring } from '@blank/graphql';
import { useI18n } from '@blank/i18n';
import { useLiveData, useService } from '@toeverything/infra';

import * as styles from './style.css';

export const TypeformLink = () => {
  const t = useI18n();
  const subscriptionService = useService(SubscriptionService);
  const authService = useService(AuthService);

  const pro = useLiveData(subscriptionService.subscription.pro$);
  const ai = useLiveData(subscriptionService.subscription.ai$);
  const account = useLiveData(authService.session.account$);

  if (!account) return null;
  if (!pro && !ai) return null;

  const plan = [];
  if (pro) plan.push(SubscriptionPlan.Pro);
  if (ai) plan.push(SubscriptionPlan.AI);

  const link = getUpgradeQuestionnaireLink({
    name: account.info?.name,
    id: account.id,
    email: account.email,
    recurring: pro?.recurring ?? ai?.recurring ?? SubscriptionRecurring.Yearly,
    plan,
  });

  return (
    <SettingRow
      className={styles.paymentMethod}
      name={t['com.blank.payment.billing-type-form.title']()}
      desc={t['com.blank.payment.billing-type-form.description']()}
    >
      <a target="_blank" href={link} rel="noreferrer">
        <Button>{t['com.blank.payment.billing-type-form.go']()}</Button>
      </a>
    </SettingRow>
  );
};
