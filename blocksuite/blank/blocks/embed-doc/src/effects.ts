import { EmbedLinkedDocBlockComponent } from './embed-linked-doc-block';
import { EmbedEdgelessLinkedDocBlockComponent } from './embed-linked-doc-block/embed-edgeless-linked-doc-block';
import { EmbedSyncedDocBlockComponent } from './embed-synced-doc-block';
import { EmbedSyncedDocCard } from './embed-synced-doc-block/components/embed-synced-doc-card';
import { EmbedEdgelessSyncedDocBlockComponent } from './embed-synced-doc-block/embed-edgeless-synced-doc-block';

export function effects() {
  customElements.define('blank-embed-synced-doc-card', EmbedSyncedDocCard);

  customElements.define(
    'blank-embed-edgeless-linked-doc-block',
    EmbedEdgelessLinkedDocBlockComponent
  );
  customElements.define(
    'blank-embed-linked-doc-block',
    EmbedLinkedDocBlockComponent
  );

  customElements.define(
    'blank-embed-edgeless-synced-doc-block',
    EmbedEdgelessSyncedDocBlockComponent
  );
  customElements.define(
    'blank-embed-synced-doc-block',
    EmbedSyncedDocBlockComponent
  );
}

declare global {
  interface HTMLElementTagNameMap {
    'blank-embed-synced-doc-card': EmbedSyncedDocCard;
    'blank-embed-synced-doc-block': EmbedSyncedDocBlockComponent;
    'blank-embed-edgeless-synced-doc-block': EmbedEdgelessSyncedDocBlockComponent;
    'blank-embed-linked-doc-block': EmbedLinkedDocBlockComponent;
    'blank-embed-edgeless-linked-doc-block': EmbedEdgelessLinkedDocBlockComponent;
  }
}
