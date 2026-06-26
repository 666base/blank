import { AuthSession } from '@blank/core/modules/cloud/entities/session';
import { AuthService } from '@blank/core/modules/cloud/services/auth';
import { AuthStore } from '@blank/core/modules/cloud/stores/auth';
import { NbstoreService } from '@blank/core/modules/storage';
import { Framework } from '@toeverything/infra';
import { of } from 'rxjs';
import { describe, expect, test, vi } from 'vitest';

describe('AuthService oauthPreflight', () => {
  test('sets client nonce locally without backend preflight', async () => {
    let nonce: string | undefined;

    const framework = new Framework();

    framework.entity(
      AuthSession,
      () =>
        ({
          account$: of(null),
          revalidate: vi.fn(),
        }) as any
    );
    framework.store(AuthStore, {
      getClientNonce: () => nonce,
      setClientNonce: (n: string) => {
        nonce = n;
      },
    } as any);
    framework.service(NbstoreService, {
      realtime: { subscribe: () => of() },
    } as any);
    framework.service(AuthService, [AuthStore, NbstoreService]);

    const auth = framework.provider().get(AuthService);
    const result = await auth.oauthPreflight('Google' as any, 'web');

    expect(result).toEqual({});
    expect(nonce).toBeTypeOf('string');
    expect((nonce as string).length).toBeGreaterThan(0);
  });
});
