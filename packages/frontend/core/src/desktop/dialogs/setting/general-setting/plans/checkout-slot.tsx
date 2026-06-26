import type { CreateCheckoutSessionInput } from '@blank/graphql';
import { type PropsWithChildren, type ReactNode, useCallback } from 'react';

export interface CheckoutSlotProps extends PropsWithChildren {
  checkoutOptions: Omit<CreateCheckoutSessionInput, 'idempotencyKey'>;
  onBeforeCheckout?: () => void;
  onCheckoutError?: (error: any) => void;
  onCheckoutSuccess?: () => void;
  renderer: (props: { onClick: () => void; loading: boolean }) => ReactNode;
}

/**
 * A wrapper component for checkout action
 */
export const CheckoutSlot = ({
  onBeforeCheckout,
  onCheckoutSuccess,
  renderer: Renderer,
}: CheckoutSlotProps) => {
  const subscribe = useCallback(() => {
    onBeforeCheckout?.();
    onCheckoutSuccess?.();
  }, [onBeforeCheckout, onCheckoutSuccess]);

  return <Renderer onClick={subscribe} loading={false} />;
};
