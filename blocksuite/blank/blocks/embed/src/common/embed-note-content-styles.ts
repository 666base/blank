import { css } from 'lit';

export const embedNoteContentStyles = css`
  .blank-embed-doc-content-note-blocks blank-divider,
  .blank-embed-doc-content-note-blocks blank-divider > * {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .blank-embed-doc-content-note-blocks blank-paragraph,
  .blank-embed-doc-content-note-blocks blank-list {
    margin-top: 4px !important;
    margin-bottom: 4px !important;
    padding: 0 2px;
  }
  .blank-embed-doc-content-note-blocks blank-paragraph *,
  .blank-embed-doc-content-note-blocks blank-list * {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 20px;
    font-size: var(--blank-font-xs);
    font-weight: 400;
  }
  .blank-embed-doc-content-note-blocks blank-list .blank-list-block__prefix {
    height: 20px;
  }
  .blank-embed-doc-content-note-blocks blank-paragraph .quote {
    padding-left: 15px;
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .blank-embed-doc-content-note-blocks blank-paragraph:has(.h1),
  .blank-embed-doc-content-note-blocks blank-paragraph:has(.h2),
  .blank-embed-doc-content-note-blocks blank-paragraph:has(.h3),
  .blank-embed-doc-content-note-blocks blank-paragraph:has(.h4),
  .blank-embed-doc-content-note-blocks blank-paragraph:has(.h5),
  .blank-embed-doc-content-note-blocks blank-paragraph:has(.h6) {
    margin-top: 6px !important;
    margin-bottom: 4px !important;
    padding: 0 2px;
  }
  .blank-embed-doc-content-note-blocks blank-paragraph:has(.h1) *,
  .blank-embed-doc-content-note-blocks blank-paragraph:has(.h2) *,
  .blank-embed-doc-content-note-blocks blank-paragraph:has(.h3) *,
  .blank-embed-doc-content-note-blocks blank-paragraph:has(.h4) *,
  .blank-embed-doc-content-note-blocks blank-paragraph:has(.h5) *,
  .blank-embed-doc-content-note-blocks blank-paragraph:has(.h6) * {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 20px;
    font-size: var(--blank-font-xs);
    font-weight: 600;
  }

  .blank-embed-doc-content-note-blocks inline-comment {
    background-color: unset !important;
    border-bottom: unset !important;
  }

  .blank-embed-linked-doc-block.horizontal {
    blank-paragraph,
    blank-list {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      max-height: 40px;
      overflow: hidden;
      display: flex;
    }
    blank-paragraph .quote {
      padding-top: 4px;
      padding-bottom: 4px;
      height: 28px;
    }
    blank-paragraph .quote::after {
      height: 20px;
      margin-top: 4px !important;
      margin-bottom: 4px !important;
    }
  }
`;
