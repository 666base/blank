import { Service } from '@toeverything/infra';

import { WorkspaceSubscription } from '../entities/workspace-subscription';
import { SubscriptionStore } from '../stores/subscription';
import type { WorkspaceServerService } from './workspace-server';

export class WorkspaceSubscriptionService extends Service {
  subscription = this.framework.createEntity(WorkspaceSubscription);

  constructor(private readonly workspaceServerService: WorkspaceServerService) {
    super();
  }
  store = this.workspaceServerService.server?.scope.get(SubscriptionStore);

  async createCheckoutSession() {
    return '';
  }
}
