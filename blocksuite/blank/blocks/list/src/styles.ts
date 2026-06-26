import { css } from 'lit';

export const listPrefix = css`
  .blank-list-block__prefix {
    display: flex;
    color: var(--blank-blue-700);
    font-size: var(--blank-font-sm);
    user-select: none;
    position: relative;
  }

  .blank-list-block__numbered {
    min-width: 22px;
    height: 24px;
    margin-left: 2px;
  }

  .blank-list-block__todo-prefix {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 24px;
    height: 24px;
    color: var(--blank-icon-color);
  }

  .blank-list-block__todo-prefix.readonly {
    cursor: default;
  }

  .blank-list-block__todo-prefix > svg {
    width: 20px;
    height: 20px;
  }
`;

export const listBlockStyles = css`
  blank-list {
    display: block;
    font-size: var(--blank-font-base);
  }

  blank-list code {
    font-size: calc(var(--blank-font-base) - 3px);
    padding: 0px 4px 2px;
  }

  .blank-list-block-container {
    box-sizing: border-box;
    border-radius: 4px;
    position: relative;
  }
  .blank-list-block-container .blank-list-block-container {
    margin-top: 0;
  }
  .blank-list-rich-text-wrapper {
    position: relative;
    display: flex;
  }
  .blank-list-rich-text-wrapper rich-text {
    flex: 1;
  }

  .blank-list--checked {
    color: var(--blank-text-secondary-color);
  }

  ${listPrefix}
`;
