import { unsafeCSSVarV2 } from '@blocksuite/blank-shared/theme';
import { css } from 'lit';

export const styles = css`
  .blank-attachment-container {
    border-radius: 8px;
    box-sizing: border-box;
    user-select: none;
    overflow: hidden;
    border: 1px solid ${unsafeCSSVarV2('layer/background/tertiary')};
    background: ${unsafeCSSVarV2('layer/background/primary')};

    &.focused {
      border-color: ${unsafeCSSVarV2('layer/insideBorder/primaryBorder')};
    }
  }

  .blank-attachment-container.comment-highlighted {
    outline: 2px solid ${unsafeCSSVarV2('block/comment/highlightUnderline')};
  }

  .blank-attachment-card {
    display: flex;
    gap: 12px;
    padding: 12px;
  }

  .blank-attachment-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    flex: 1 0 0;
    min-width: 0;
  }

  .truncate {
    align-self: stretch;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .blank-attachment-content-title {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    align-self: stretch;
  }

  .blank-attachment-content-title-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--blank-text-primary-color);
    font-size: 16px;
  }

  .blank-attachment-content-title-text {
    color: var(--blank-text-primary-color);
    font-family: var(--blank-font-family);
    font-size: var(--blank-font-sm);
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
  }

  .blank-attachment-content-description {
    display: flex;
    align-items: center;
    align-self: stretch;
    gap: 8px;
  }

  .blank-attachment-content-info {
    color: var(--blank-text-secondary-color);
    font-family: var(--blank-font-family);
    font-size: var(--blank-font-xs);
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }

  .blank-attachment-content-button {
    display: flex;
    height: 20px;
    align-items: center;
    align-self: stretch;
    gap: 4px;
    white-space: nowrap;
    padding: 0 4px;
    color: ${unsafeCSSVarV2('button/primary')};
    font-family: var(--blank-font-family);
    font-size: var(--blank-font-xs);
    font-style: normal;
    font-weight: 500;
    text-transform: capitalize;
    line-height: 20px;

    svg {
      font-size: 16px;
    }
  }

  .blank-attachment-banner {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .blank-attachment-card.loading {
    .blank-attachment-content-title-text {
      color: ${unsafeCSSVarV2('text/placeholder')};
    }
  }

  .blank-attachment-card.error {
    .blank-attachment-content-title-icon {
      color: ${unsafeCSSVarV2('status/error')};
    }
  }

  .blank-attachment-card.loading,
  .blank-attachment-card.error {
    background: ${unsafeCSSVarV2('layer/background/secondary')};
  }

  .blank-attachment-card.cubeThick {
    flex-direction: column-reverse;

    .blank-attachment-content {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
    }

    .blank-attachment-banner {
      justify-content: space-between;
    }
  }

  .blank-attachment-embed-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .blank-attachment-embed-status {
    position: absolute;
    left: 14px;
    bottom: 64px;
  }

  .blank-attachment-embed-event-mask {
    position: absolute;
    inset: 0;
  }
`;
