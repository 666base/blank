import type { RootBlockModel } from '@blocksuite/blank/model';
import { BlockComponent } from '@blocksuite/blank/std';
import { html } from 'lit';

export class MindmapRootBlock extends BlockComponent<RootBlockModel> {
  override render() {
    return html`
      <style>
        .blank-mini-mindmap-root {
          display: block;
          width: 100%;
          height: 100%;

          background-size: 20px 20px;
          background-color: var(--blank-background-primary-color);
          background-image: radial-gradient(
            var(--blank-edgeless-grid-color) 1px,
            var(--blank-background-primary-color) 1px
          );
        }
      </style>
      <div class="blank-mini-mindmap-root">
        ${this.host.renderChildren(this.model)}
      </div>
    `;
  }
}
