import { PlusIcon } from '@blocksuite/icons/lit';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import type { BLANK_ADD_BLOCK_WIDGET } from '../consts.js';

export class BlankAddBlockWidget extends LitElement {
  static override styles = css`
    :host {
      display: block;
      pointer-events: none;
    }

    .blank-add-block-widget {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      margin-top: 8px;
      cursor: pointer;
      border-radius: 4px;
      color: var(--blank-placeholder-color);
      background: transparent;
      border: none;
      padding: 0;
      transition:
        color 0.2s ease,
        background 0.2s ease;
      pointer-events: auto;
      user-select: none;
      box-sizing: border-box;
    }

    .blank-add-block-widget:hover {
      background: var(--blank-hover-color);
      color: var(--blank-text-primary-color);
    }

    .blank-add-block-widget svg {
      width: 12px;
      height: 12px;
      flex-shrink: 0;
    }
  `;

  @property({ type: Boolean })
  accessor visible = false;

  private readonly _handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('add-block', { bubbles: true, composed: true })
    );
  };

  override render() {
    if (!this.visible) return html``;

    return html`
      <button
        class="blank-add-block-widget"
        title="Click to add a block below"
        aria-label="Add block below"
        @click=${this._handleClick}
      >
        ${PlusIcon({ width: '12', height: '12' })}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [BLANK_ADD_BLOCK_WIDGET]: BlankAddBlockWidget;
  }
}
