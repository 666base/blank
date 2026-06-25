import { ServerService } from '@affine/core/modules/cloud/services/server';
import { AuthStore } from '@affine/core/modules/cloud/stores/auth';
import { GlobalState } from '@affine/core/modules/storage';
import { Framework } from '@toeverything/infra';
import { describe, expect, test } from 'vitest';

function createStore() {
  const framework = new Framework();
  framework.impl(GlobalState, {} as any);
  framework.service(ServerService, {
    server: { id: 'test-server' },
  } as any);
  framework.store(AuthStore, [GlobalState, ServerService]);
  return framework.provider().get(AuthStore);
}

describe('AuthStore', () => {
  test('uses an empty local session without backend bootstrap', async () => {
    const store = createStore();

    await expect(store.fetchSession()).resolves.toEqual({ user: null });
  });
});
