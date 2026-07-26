import { useI18n } from '@affine/i18n';

/** Blank: no “Star AFFiNE” upsell. */
export const StarAFFiNEModal = (_props: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  useI18n();
  return null;
};
