import { ConfirmModalProvider, PromptModalProvider } from '@blank/component';
import { ProviderComposer } from '@blank/component/provider-composer';
import { ThemeProvider } from '@blank/core/components/theme-provider';
import type { createStore } from 'jotai';
import { Provider } from 'jotai';
import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';

import { useImageAntialiasing } from '../hooks/use-image-antialiasing';

export type BlankContextProps = PropsWithChildren<{
  store?: ReturnType<typeof createStore>;
}>;

export function BlankContext(props: BlankContextProps) {
  useImageAntialiasing();
  return (
    <ProviderComposer
      contexts={useMemo(
        () =>
          [
            <Provider key="JotaiProvider" store={props.store} />,
            <ThemeProvider key="ThemeProvider" />,
            <ConfirmModalProvider key="ConfirmModalProvider" />,
            <PromptModalProvider key="PromptModalProvider" />,
          ].filter(Boolean),
        [props.store]
      )}
    >
      {props.children}
    </ProviderComposer>
  );
}
