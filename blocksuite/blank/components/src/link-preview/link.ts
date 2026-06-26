import {
  getHostName,
  isValidUrl,
  normalizeUrl,
} from '@blocksuite/blank-shared/utils';
import { PropTypes, requiredProperties } from '@blocksuite/std';
import { css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit-html';

@requiredProperties({
  url: PropTypes.string,
})
export class LinkPreview extends LitElement {
  static override styles = css`
    .blank-link-preview {
      display: flex;
      justify-content: flex-start;
      min-width: 60px;
      max-width: 140px;
      user-select: none;
      cursor: pointer;

      color: var(--blank-link-color);
      font-feature-settings:
        'clig' off,
        'liga' off;
      font-family: var(--blank-font-family);
      font-size: var(--blank-font-sm);
      font-style: normal;
      font-weight: 400;
      text-decoration: none;
      text-wrap: nowrap;
    }

    .blank-link-preview > span {
      display: inline-block;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;

      text-overflow: ellipsis;
      overflow: hidden;
    }
  `;

  @property({ attribute: false })
  accessor url!: string;

  override render() {
    const { url } = this;
    const normalizedUrl = normalizeUrl(url);
    const safeUrl =
      normalizedUrl && isValidUrl(normalizedUrl) ? normalizedUrl : null;
    const hostName = getHostName(safeUrl ?? url);

    if (!safeUrl) {
      return html`
        <span class="blank-link-preview">
          <span>${hostName}</span>
        </span>
      `;
    }

    return html`
      <a
        class="blank-link-preview"
        rel="noopener noreferrer"
        target="_blank"
        href=${safeUrl}
      >
        <span>${hostName}</span>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'blank-link-preview': LinkPreview;
  }
}
