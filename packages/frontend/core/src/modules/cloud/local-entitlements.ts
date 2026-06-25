import {
  SubscriptionPlan,
  type SubscriptionPrice,
  SubscriptionRecurring,
  SubscriptionStatus,
} from '@affine/graphql';

import { isLocalOnlyMode } from '../../utils/local-only';
import type { SubscriptionType } from './entities/subscription';

const now = new Date().toISOString();
const farFuture = new Date('2099-12-31T23:59:59.000Z').toISOString();

function localSubscription(
  plan: SubscriptionPlan,
  recurring: SubscriptionRecurring
): SubscriptionType {
  return {
    __typename: 'SubscriptionType',
    canceledAt: null,
    createdAt: now,
    end: farFuture,
    iapStore: null,
    id: `local-${plan.toLowerCase()}`,
    nextBillAt: null,
    plan,
    provider: 'local',
    recurring,
    start: now,
    status: SubscriptionStatus.Active,
    trialEnd: null,
    trialStart: null,
    updatedAt: now,
    variant: null,
  };
}

export function hasLocalEntitlements() {
  return isLocalOnlyMode();
}

export function getLocalSubscriptions(): SubscriptionType[] {
  return [
    localSubscription(SubscriptionPlan.Pro, SubscriptionRecurring.Lifetime),
    localSubscription(SubscriptionPlan.AI, SubscriptionRecurring.Monthly),
    localSubscription(SubscriptionPlan.Team, SubscriptionRecurring.Yearly),
  ];
}

export function getLocalWorkspaceSubscription() {
  return localSubscription(SubscriptionPlan.Team, SubscriptionRecurring.Yearly);
}

export function getLocalSubscriptionPrices(): SubscriptionPrice[] {
  return [
    {
      __typename: 'SubscriptionPrice',
      amount: 0,
      currency: 'USD',
      lifetimeAmount: 0,
      plan: SubscriptionPlan.Pro,
      type: 'local',
      yearlyAmount: 0,
    },
    {
      __typename: 'SubscriptionPrice',
      amount: 0,
      currency: 'USD',
      lifetimeAmount: null,
      plan: SubscriptionPlan.AI,
      type: 'local',
      yearlyAmount: 0,
    },
    {
      __typename: 'SubscriptionPrice',
      amount: 0,
      currency: 'USD',
      lifetimeAmount: null,
      plan: SubscriptionPlan.Team,
      type: 'local',
      yearlyAmount: 0,
    },
  ];
}
