import { fontXSStyle, panelBaseStyle } from '@blocksuite/blank-shared/styles';
import { css } from 'lit';

export const renameStyles = css`
  ${panelBaseStyle('.blank-attachment-rename-container')}
  .blank-attachment-rename-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 320px;
    gap: 12px;
    padding: 12px;
    z-index: var(--blank-z-index-popover);
  }

  .blank-attachment-rename-input-wrapper {
    display: flex;
    min-width: 280px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 10px;
    background: var(--blank-white-10);
    border-radius: 4px;
    border: 1px solid var(--blank-border-color);
  }

  .blank-attachment-rename-input-wrapper:focus-within {
    border-color: var(--blank-blue-700);
    box-shadow: var(--blank-active-shadow);
  }

  .blank-attachment-rename-input-wrapper input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: var(--blank-text-primary-color);
  }
  ${fontXSStyle('.blank-attachment-rename-input-wrapper input')}

  .blank-attachment-rename-input-wrapper input::placeholder {
    color: var(--blank-placeholder-color);
  }

  .blank-attachment-rename-extension {
    font-size: var(--blank-font-xs);
    color: var(--blank-text-secondary-color);
  }

  .blank-attachment-rename-overlay-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: var(--blank-z-index-popover);
  }
`;

export const styles = css`
  :host {
    z-index: 1;
  }
`;
