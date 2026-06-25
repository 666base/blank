import { ServerService } from '@affine/core/modules/cloud/services/server';
import { AuthStore } from '@affine/core/modules/cloud/stores/auth';
import { AuthProvider } from '@affine/core/modules/cloud/provider/auth';
import { FetchService } from '@affine/core/modules/cloud/services/fetch';
import { GraphQLService } from '@affine/core/modules/cloud/services/graphql';
import { GlobalState, NbstoreService } from '@affine/core/modules/storage';
import { Framework } from '@toeverything/infra';
import { describe, expect, test, vi } from 'vitest';

function createStore() {
  const framework = new Framework();
  const fetchMock = {
    fetch: vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ user: null }),
    }),
  };
  const gqlMock = { gql: vi.fn() };
  const nbstoreMock = {
    realtime: {
      request: vi.fn(),
      configure: vi.fn().mockResolvedValue(undefined),
    },
  };
  const authProviderMock = {
    signInMagicLink: vi.fn(),
    signInOauth: vi.fn(),
    signInPassword: vi.fn(),
    signInOpenAppSignInCode: vi.fn(),
    signOut: vi.fn(),
  };

  framework.impl(GlobalState, {
    get: () => undefined,
    set: () => {},
    watch: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
  } as any);
  framework.service(ServerService, {
    server: {
      id: 'test-server',
      baseUrl: 'http://localhost:3010',
      config$: { value: { type: 'Selfhosted' } },
    },
  } as any);
  framework.impl(FetchService, fetchMock as any);
  framework.impl(GraphQLService, gqlMock as any);
  framework.impl(NbstoreService, nbstoreMock as any);
  framework.impl(AuthProvider, authProviderMock);

  framework.store(AuthStore, [
    FetchService,
    GraphQLService,
    GlobalState,
    ServerService,
    AuthProvider,
    NbstoreService,
  ]);
  return { store: framework.provider().get(AuthStore), fetchMock };
}

describe('AuthStore', () => {
  test('fetchSession returns null when server has no session', async () => {
    const { store, fetchMock } = createStore();

    await expect(store.fetchSession()).resolves.toEqual({ user: null });
    expect(fetchMock.fetch).toHaveBeenCalledWith('/api/auth/session', {
      cache: 'no-store',
    });
  });
});
