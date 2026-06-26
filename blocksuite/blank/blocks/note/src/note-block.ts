import type { NoteBlockModel } from '@blocksuite/blank-model';
import { BlockComponent } from '@blocksuite/std';
import { css, html } from 'lit';

export class NoteBlockComponent extends BlockComponent<NoteBlockModel> {
  static override styles = css`
    .blank-note-block-container {
      display: flow-root;
    }
    .blank-note-block-container.selected {
      background-color: var(--blank-hover-color);
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
  }

  override renderBlock() {
    return html`
      <div class="blank-note-block-container">
        <div class="blank-block-children-container">
          ${this.renderChildren(this.model)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'blank-note': NoteBlockComponent;
  }
}
