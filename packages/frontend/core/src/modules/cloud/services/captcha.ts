import {
  catchErrorInto,
  effect,
  fromPromise,
  LiveData,
  onComplete,
  onStart,
  Service,
} from '@toeverything/infra';
import { exhaustMap, switchMap, tap } from 'rxjs';

import type { ValidatorProvider } from '../provider/validator';
import type { ServerService } from './server';

export class CaptchaService extends Service {
  needCaptcha$ = this.serverService.server.features$.map(
    r => r?.captcha || false
  );
  challenge$ = new LiveData<string | undefined>(undefined);
  isLoading$ = new LiveData(false);
  verifyToken$ = new LiveData<string | undefined>(undefined);
  error$ = new LiveData<any | undefined>(undefined);

  constructor(
    private readonly serverService: ServerService,
    public readonly validatorProvider?: ValidatorProvider
  ) {
    super();
  }

  revalidate = effect(
    exhaustMap(() => {
      return fromPromise(async (_signal: any) => {
        if (!this.needCaptcha$.value || !this.validatorProvider) {
          return {} as any;
        }
        return {} as any;
      }).pipe(
        tap(({ challenge, token }) => {
          this.verifyToken$.next(token);
          this.challenge$.next(challenge);
          this.resetAfter5min();
        }),
        catchErrorInto(this.error$),
        onStart(() => {
          this.challenge$.next(undefined);
          this.verifyToken$.next(undefined);
          this.isLoading$.next(true);
        }),
        onComplete(() => this.isLoading$.next(false))
      );
    })
  );

  resetAfter5min = effect(
    switchMap(() => {
      return fromPromise(async () => {
        await new Promise(resolve => {
          setTimeout(resolve, 1000 * 60 * 5);
        });
        return true;
      }).pipe(
        tap(_ => {
          this.challenge$.next(undefined);
          this.verifyToken$.next(undefined);
          this.isLoading$.next(false);
        })
      );
    })
  );
}
