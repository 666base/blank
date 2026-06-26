import { AIStarIconWithAnimation } from '@blocksuite/blank/components/icons';
import { ShadowlessElement } from '@blocksuite/blank/std';
import { AiIcon } from '@blocksuite/icons/lit';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import type { ChatStatus } from '../ai-chat-messages';

const BlankAvatarIcon = AiIcon({
  width: '20px',
  height: '20px',
  style: 'color: var(--blank-primary-color)',
});

export class AssistantAvatar extends ShadowlessElement {
  @property({ attribute: 'data-status', reflect: true })
  accessor status: ChatStatus = 'idle';

  static override styles = css`
    chat-assistant-avatar {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
  `;

  protected override render() {
    return html`${this.status === 'transmitting'
      ? AIStarIconWithAnimation
      : BlankAvatarIcon}
    Blank AI`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-assistant-avatar': AssistantAvatar;
  }
}
