import { css } from 'lit';

export const styles = css`
  .blank-block-component.border.light .selected-style {
    border-radius: 8px;
    box-shadow: 0px 0px 0px 1px var(--blank-brand-color);
  }
  .blank-block-component.border.dark .selected-style {
    border-radius: 8px;
    box-shadow: 0px 0px 0px 1px var(--blank-brand-color);
  }
  @media print {
    .blank-block-component.border.light .selected-style,
    .blank-block-component.border.dark .selected-style {
      box-shadow: none;
    }
  }
`;
