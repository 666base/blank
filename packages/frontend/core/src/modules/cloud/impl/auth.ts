import type { Framework } from '@toeverything/infra';

import { AuthProvider } from '../provider/auth';
import { ServerScope } from '../scopes/server';

export function configureDefaultAuthProvider(framework: Framework) {
  framework.scope(ServerScope).override(AuthProvider, () => {
    return {
      async signInMagicLink(
        email: string,
        token: string,
        clientNonce?: string
      ) {
        return;
      },

      async signInOauth(
        code: string,
        state: string,
        _provider: string,
        clientNonce?: string
      ) {
        return { redirectUri: '' };
      },
      async signInPassword(credential: {
        email: string;
        password: string;
        verifyToken?: string;
        challenge?: string;
      }) {
        return null;
      },
      async signInOpenAppSignInCode(code: string) {
        return;
      },
      async signOut() {
        return;
      },
    };
  });
}
