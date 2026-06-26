import { VirtualKeyboardProvider } from '@blank/core/mobile/modules/virtual-keyboard';
import { globalVars } from '@blank/core/mobile/styles/variables.css';
import type { Container } from '@blocksuite/blank/global/di';
import { DisposableGroup } from '@blocksuite/blank/global/disposable';
import {
  VirtualKeyboardProvider as BSVirtualKeyboardProvider,
  type VirtualKeyboardProviderWithAction,
} from '@blocksuite/blank/shared/services';
import { LifeCycleWatcher } from '@blocksuite/blank/std';
import type { ExtensionType } from '@blocksuite/blank/store';
import { batch, signal } from '@preact/signals-core';
import type { FrameworkProvider } from '@toeverything/infra';

export function KeyboardToolbarExtension(
  framework: FrameworkProvider
): ExtensionType {
  const blankVirtualKeyboardProvider = framework.get(VirtualKeyboardProvider);

  class BSVirtualKeyboardService
    extends LifeCycleWatcher
    implements BSVirtualKeyboardProvider
  {
    static override key = BSVirtualKeyboardProvider.identifierName;

    private readonly _disposables = new DisposableGroup();

    // eslint-disable-next-line rxjs/finnish
    readonly visible$ = signal(false);

    // eslint-disable-next-line rxjs/finnish
    readonly height$ = signal(0);

    // eslint-disable-next-line rxjs/finnish
    readonly staticHeight$ = signal(0);

    // eslint-disable-next-line rxjs/finnish
    readonly appTabSafeArea$ = signal(`calc(${globalVars.appTabSafeArea})`);

    static override setup(di: Container) {
      super.setup(di);
      di.addImpl(BSVirtualKeyboardProvider, provider => {
        return provider.get(this);
      });
    }

    override mounted() {
      this._disposables.add(
        blankVirtualKeyboardProvider.onChange(({ visible, height }) => {
          batch(() => {
            if (visible && this.staticHeight$.peek() !== height) {
              this.staticHeight$.value = height;
            }
            this.visible$.value = visible;
            this.height$.value = height;
          });
        })
      );
    }

    override unmounted() {
      this._disposables.dispose();
    }
  }

  class BSVirtualKeyboardServiceWithShowAndHide
    extends BSVirtualKeyboardService
    implements VirtualKeyboardProviderWithAction
  {
    show() {
      if ('show' in blankVirtualKeyboardProvider) {
        blankVirtualKeyboardProvider.show();
      }
    }

    hide() {
      if ('hide' in blankVirtualKeyboardProvider) {
        blankVirtualKeyboardProvider.hide();
      }
    }
  }

  return BSVirtualKeyboardServiceWithShowAndHide;
}
