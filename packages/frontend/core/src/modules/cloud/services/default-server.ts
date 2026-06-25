import { ServerDeploymentType } from '@affine/graphql';
import { Service } from '@toeverything/infra';

import type { Server } from '../entities/server';
import { DEFAULT_BUILTIN_SERVER_ID } from '../constant';
import type { ServersService } from './servers';

export class DefaultServerService extends Service {
  readonly server: Server;

  constructor(private readonly serversService: ServersService) {
    super();

    const server = this.serversService.server$(DEFAULT_BUILTIN_SERVER_ID).value;
    if (!server) {
      throw new Error(`No server found (${DEFAULT_BUILTIN_SERVER_ID})`);
    }
    this.server = server;
  }

  async waitForSelfhostedServerConfig() {
    if (this.server.config$.value.type === ServerDeploymentType.Selfhosted) {
      await this.server.waitForConfigRevalidation();
    }
  }
}
