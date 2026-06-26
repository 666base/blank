import { fontSMStyle, panelBaseStyle } from '@blocksuite/blank-shared/styles';
import { css } from 'lit';

const editLinkStyle = css`
  .blank-link-edit-popover {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas:
      'text-area .'
      'link-area btn';
    justify-items: center;
    align-items: center;
    width: 320px;
    gap: 8px 12px;
    padding: 8px;
    box-sizing: content-box;
  }

  ${fontSMStyle('.blank-link-edit-popover label')}
  .blank-link-edit-popover label {
    box-sizing: border-box;
    color: var(--blank-icon-color);
    font-weight: 400;
  }

  ${fontSMStyle('.blank-link-edit-popover input')}
  .blank-link-edit-popover input {
    color: inherit;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--blank-text-primary-color);
  }
  .blank-link-edit-popover input::placeholder {
    color: var(--blank-placeholder-color);
  }
  input:focus {
    outline: none;
  }
  .blank-link-edit-popover input:focus ~ label,
  .blank-link-edit-popover input:active ~ label {
    color: var(--blank-primary-color);
  }

  .blank-edit-area {
    width: 280px;
    padding: 4px 10px;
    display: grid;
    gap: 8px;
    grid-template-columns: 26px auto;
    grid-template-rows: repeat(1, 1fr);
    grid-template-areas: 'label input';
    user-select: none;
    box-sizing: border-box;

    border: 1px solid var(--blank-border-color);
    box-sizing: border-box;

    outline: none;
    border-radius: 4px;
    background: transparent;
  }
  .blank-edit-area:focus-within {
    border-color: var(--blank-blue-700);
    box-shadow: var(--blank-active-shadow);
  }

  .blank-edit-area.text {
    grid-area: text-area;
  }

  .blank-edit-area.link {
    grid-area: link-area;
  }

  .blank-edit-label {
    grid-area: label;
  }

  .blank-edit-input {
    grid-area: input;
  }

  .blank-confirm-button {
    grid-area: btn;
    user-select: none;
  }
`;

export const linkPopupStyle = css`
  :host {
    box-sizing: border-box;
  }

  .mock-selection {
    position: absolute;
    background-color: rgba(35, 131, 226, 0.28);
  }

  ${panelBaseStyle('.popover-container')}
  .popover-container {
    z-index: var(--blank-z-index-popover);
    animation: blank-popover-fade-in 0.2s ease;
    position: absolute;
  }

  @keyframes blank-popover-fade-in {
    from {
      opacity: 0;
      transform: translateY(-3px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .overlay-root {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: var(--blank-z-index-popover);
  }

  .mock-selection-container {
    pointer-events: none;
  }

  .blank-link-popover.create {
    display: flex;
    gap: 12px;
    padding: 8px;

    color: var(--blank-text-primary-color);
  }

  .blank-link-popover-input {
    min-width: 280px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 10px;
    background: var(--blank-white-10);
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: var(--blank-border-color);
    color: var(--blank-text-primary-color);
  }
  ${fontSMStyle('.blank-link-popover-input')}
  .blank-link-popover-input::placeholder {
    color: var(--blank-placeholder-color);
  }
  .blank-link-popover-input:focus {
    border-color: var(--blank-blue-700);
    box-shadow: var(--blank-active-shadow);
  }

  ${editLinkStyle}
`;
