import { unsafeCSSVar, unsafeCSSVarV2 } from '@blocksuite/blank-shared/theme';
import { baseTheme } from '@toeverything/theme';
import { css, unsafeCSS } from 'lit';

export const styles = css`
  bookmark-card {
    display: block;
    height: 100%;
    width: 100%;
  }

  .blank-bookmark-card {
    container: blank-bookmark-card / inline-size;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    width: 100%;

    border-radius: 8px;
    border: 1px solid ${unsafeCSSVarV2('layer/background/tertiary')};

    background: ${unsafeCSSVarV2('layer/background/primary')};
    user-select: none;
  }

  .blank-bookmark-content {
    width: calc(100% - 204px);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-self: stretch;
    gap: 4px;
    padding: 12px;
  }

  .blank-bookmark-content-title {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;

    align-self: stretch;
  }

  .blank-bookmark-content-title-icon {
    display: flex;
    width: 16px;
    height: 16px;
    justify-content: center;
    align-items: center;
  }

  .blank-bookmark-content-title-icon img,
  .blank-bookmark-content-title-icon object,
  .blank-bookmark-content-title-icon svg {
    width: 16px;
    height: 16px;
    fill: var(--blank-background-primary-color);
  }

  .blank-bookmark-content-title-text {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--blank-text-primary-color);

    font-family: var(--blank-font-family);
    font-size: var(--blank-font-sm);
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
  }

  .blank-bookmark-content-description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    flex-grow: 1;

    white-space: normal;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--blank-text-primary-color);

    font-family: var(--blank-font-family);
    font-size: var(--blank-font-xs);
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }

  .blank-bookmark-content-url {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    width: max-content;
    max-width: 100%;
  }

  .blank-bookmark-content-url > span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    word-break: break-all;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--blank-text-secondary-color);

    font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
    font-size: var(--blank-font-xs);
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
  .blank-bookmark-content-url:hover > span {
    color: var(--blank-link-color);
  }
  .blank-bookmark-content-url:hover {
    fill: var(--blank-link-color);
  }

  .blank-bookmark-content-url-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 20px;
  }
  .blank-bookmark-content-url-icon {
    height: 12px;
    width: 12px;
    color: ${unsafeCSSVar('iconSecondary')};
  }

  .blank-bookmark-banner {
    margin: 12px 12px 0px 0px;
    width: 204px;
    max-width: 100%;
    height: 102px;
  }

  .blank-bookmark-banner img,
  .blank-bookmark-banner object,
  .blank-bookmark-banner svg {
    width: 204px;
    max-width: 100%;
    height: 102px;
    object-fit: cover;
    border-radius: 4px;
  }

  .blank-bookmark-card.comment-highlighted {
    outline: 2px solid ${unsafeCSSVarV2('block/comment/highlightUnderline')};
  }

  .blank-bookmark-card.loading {
    .blank-bookmark-content-title-text {
      color: var(--blank-placeholder-color);
    }
  }

  .blank-bookmark-card.error {
    .blank-bookmark-content-description {
      color: var(--blank-placeholder-color);
    }
  }

  .blank-bookmark-card.selected {
    .blank-bookmark-content-url > span {
      color: var(--blank-link-color);
    }
    .blank-bookmark-content-url .blank-bookmark-content-url-icon {
      color: var(--blank-link-color);
    }
  }

  .blank-bookmark-card.list {
    .blank-bookmark-content {
      width: 100%;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .blank-bookmark-content-title {
      width: calc(100% - 204px);
    }

    .blank-bookmark-content-url {
      width: 204px;
      justify-content: flex-end;
    }

    .blank-bookmark-content-description {
      display: none;
    }

    .blank-bookmark-banner {
      display: none;
    }
  }

  .blank-bookmark-card.vertical {
    flex-direction: column-reverse;
    height: 100%;

    .blank-bookmark-content {
      width: 100%;
    }

    .blank-bookmark-content-description {
      -webkit-line-clamp: 6;
      max-height: 120px;
    }

    .blank-bookmark-content-url-wrapper {
      max-width: fit-content;
      display: flex;
      align-items: flex-end;
      flex-grow: 1;
      cursor: pointer;
    }

    .blank-bookmark-banner {
      width: 340px;
      height: 170px;
      margin-left: 12px;
    }

    .blank-bookmark-banner img,
    .blank-bookmark-banner object,
    .blank-bookmark-banner svg {
      width: 340px;
      height: 170px;
    }
  }

  .blank-bookmark-card.cube {
    .blank-bookmark-content {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
    }

    .blank-bookmark-content-title {
      flex-direction: column;
      gap: 4px;
      align-items: flex-start;
    }

    .blank-bookmark-content-title-text {
      -webkit-line-clamp: 2;
    }

    .blank-bookmark-content-description {
      display: none;
    }

    .blank-bookmark-banner {
      display: none;
    }
  }

  @container blank-bookmark-card (width < 375px) {
    .blank-bookmark-content {
      width: 100%;
    }
    .blank-bookmark-card:not(.edgeless) .blank-bookmark-banner {
      display: none;
    }
  }
`;
