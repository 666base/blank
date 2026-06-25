import type { OAuthProviderType } from '@affine/graphql';
import { OnEvent, Service } from '@toeverything/infra';
import { nanoid } from 'nanoid';
import { distinctUntilChanged, map, skip, type Subscription } from 'rxjs';

import { ApplicationFocused } from '../../lifecycle';
import type { NbstoreService } from '../../storage';
import { isLocalOnlyMode } from '../../../utils/local-only';
import { AuthSession } from '../entities/session';
import { AccountChanged } from '../events/account-changed';
import { AccountLoggedIn } from '../events/account-logged-in';
import { AccountLoggedOut } from '../events/account-logged-out';
import { ServerStarted } from '../events/server-started';
import type { AuthStore } from '../stores/auth';

@OnEvent(ApplicationFocused, e => e.onApplicationFocused)
@OnEvent(ServerStarted, e => e.onServerStarted)
export class AuthService extends Service {
  session = this.framework.createEntity(AuthSession);
  private profileSubscription?: Subscription;

  constructor(
    private readonly store: AuthStore,
    private readonly nbstoreService: NbstoreService
  ) {
    super();

    this.session.account$
      .pipe(
        map(a => ({
          id: a?.id,
          account: a,
        })),
        distinctUntilChanged((a, b) => a.id === b.id), // only emit when the value changes
        skip(1) // skip the initial value
      )
      .subscribe(({ account }) => {
        if (account === null) {
          this.eventBus.emit(AccountLoggedOut, account);
          this.profileSubscription?.unsubscribe();
          this.profileSubscription = undefined;
        } else {
          this.eventBus.emit(AccountLoggedIn, account);
          this.subscribeProfile();
        }
        this.eventBus.emit(AccountChanged, account);
      });

    if (!isLocalOnlyMode()) {
      this.subscribeProfile();
    }
  }

  private onServerStarted() {
    if (isLocalOnlyMode()) return;
    this.session.revalidate();
    this.subscribeProfile();
  }

  private onApplicationFocused() {
    if (isLocalOnlyMode()) return;
    this.session.revalidate();
  }

  private subscribeProfile() {
    this.profileSubscription?.unsubscribe();
    this.profileSubscription = undefined;
    if (isLocalOnlyMode()) return;
    if (!this.session.account$.value) return;
    this.profileSubscription = this.nbstoreService.realtime
      .subscribe('user.profile.changed', {})
      .subscribe({
        next: () => {
          void (async () => {
            this.session.revalidate();
            await this.session.waitForRevalidation();
            this.eventBus.emit(AccountChanged, this.session.account$.value);
          })().catch(() => {});
        },
        error: () => {
          this.profileSubscription = undefined;
        },
      });
  }

  override dispose() {
    super.dispose();
    this.profileSubscription?.unsubscribe();
    this.profileSubscription = undefined;
  }

  async sendEmailMagicLink(
    email: string,
    verifyToken?: string,
    challenge?: string,
    redirectUrl?: string // url to redirect to after signed-in
  ) {
    this.setClientNonce();
    return;
  }

  async signInMagicLink(email: string, token: string, byLink = true) {
    return;
  }

  async oauthPreflight(
    provider: OAuthProviderType,
    client: string,
    /** @deprecated*/ redirectUrl?: string
  ): Promise<Record<string, string>> {
    this.setClientNonce();
    return {};
  }

  async signInOauth(code: string, state: string, provider: string) {
    return { redirectUri: '' };
  }

  async createOpenAppSignInCode() {
    return '';
  }

  async signInOpenAppSignInCode(code: string) {
    return;
  }

  async signInPassword(credential: {
    email: string;
    password: string;
    verifyToken?: string;
    challenge?: string;
  }) {
    return;
  }

  async signOut() {
    this.store.setCachedAuthSession(null);
    this.session.revalidate();
  }

  async deleteAccount() {
    this.store.setCachedAuthSession(null);
    this.session.revalidate();
    return null;
  }

  checkUserByEmail(email: string) {
    return Promise.resolve(null);
  }

  captchaHeaders(token: string, challenge?: string) {
    const headers: Record<string, string> = {
      'x-captcha-token': token,
    };

    if (challenge) {
      headers['x-captcha-challenge'] = challenge;
    }

    return headers;
  }

  private setClientNonce(): string {
    const nonce = nanoid();
    this.store.setClientNonce(nonce);
    return nonce;
  }
}
