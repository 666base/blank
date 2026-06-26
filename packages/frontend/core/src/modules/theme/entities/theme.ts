import { ColorScheme } from '@blocksuite/blank/model';
import { createSignalFromObservable } from '@blocksuite/blank-shared/utils';
import type { Signal } from '@preact/signals-core';
import { isDarkColorMode } from '@blank/core/utils/color-mode';
import { Entity, LiveData } from '@toeverything/infra';

export class AppTheme extends Entity {
  theme$ = new LiveData<string | undefined>(undefined);

  themeSignal: Signal<ColorScheme>;

  constructor() {
    super();
    const { signal, cleanup } = createSignalFromObservable<ColorScheme>(
      this.theme$.map(theme =>
        isDarkColorMode(theme) ? ColorScheme.Dark : ColorScheme.Light
      ),
      ColorScheme.Light
    );
    this.themeSignal = signal;
    this.disposables.push(cleanup);
  }
}
