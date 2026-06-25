import type { CurrentUserProfileSnapshot } from '@affine/realtime';
import { Store } from '@toeverything/infra';

import type { GlobalState } from '../../storage';
import type { AuthSessionInfo } from '../entities/session';
import type { SignInUserInfo } from '../provider/auth';
import type { ServerService } from '../services/server';

export interface AccountProfile extends CurrentUserProfileSnapshot {
  authMethods?: {
    password: { bound: boolean };
    oauth: { bound: boolean; providers: string[] };
    passkey: { bound: boolean; count: number };
  };
}

export class AuthStore extends Store {
  constructor(
    private readonly globalState: GlobalState,
    private readonly serverService: ServerService
  ) {
    super();
  }

  watchCachedAuthSession() {
    return this.globalState.watch<AuthSessionInfo>(
      `${this.serverService.server.id}-auth`
    );
  }

  getCachedAuthSession() {
    return this.globalState.get<AuthSessionInfo>(
      `${this.serverService.server.id}-auth`
    );
  }

  setCachedAuthSession(session: AuthSessionInfo | null) {
    this.globalState.set(`${this.serverService.server.id}-auth`, session);
  }

  setCachedSignInUser(user: SignInUserInfo) {
    this.setCachedAuthSession({
      account: {
        id: user.id,
        email: user.email,
        label: user.name,
        avatar: user.avatarUrl,
        info: {
          id: user.id,
          email: user.email,
          name: user.name,
          hasPassword: user.hasPassword,
          avatarUrl: user.avatarUrl,
          emailVerified: user.emailVerified,
          features: [],
        },
      },
    });
  }

  getClientNonce() {
    return this.globalState.get<string>('auth-client-nonce');
  }

  setClientNonce(nonce: string) {
    this.globalState.set('auth-client-nonce', nonce);
  }

  async fetchSession() {
    return { user: null };
  }

  async signInMagicLink(email: string, token: string) {
    return;
  }

  async signInOauth(code: string, state: string, provider: string) {
    return { redirectUri: '' };
  }

  async signInPassword(credential: {
    email: string;
    password: string;
    verifyToken?: string;
    challenge?: string;
  }) {
    return null;
  }

  async signInOpenAppSignInCode(code: string) {
    return;
  }

  async signOut() {
    this.setCachedAuthSession(null);
  }

  async uploadAvatar(file: File) {
    return;
  }

  async removeAvatar() {
    return;
  }

  async updateLabel(label: string) {
    return;
  }

  async checkUserByEmail(email: string) {
    return null;
  }

  async deleteAccount() {
    this.setCachedAuthSession(null);
    return null;
  }
}
