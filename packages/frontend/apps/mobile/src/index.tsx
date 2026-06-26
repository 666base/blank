import './setup';

import { Telemetry } from '@blank/core/components/telemetry';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

function mountApp() {
  // oxlint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = document.getElementById('app')!;
  try {
    createRoot(root).render(
      <StrictMode>
        <Telemetry />
        <App />
      </StrictMode>
    );
  } catch (err) {
    document.getElementById('blank-boot-splash')?.remove();
    console.error('Failed to bootstrap app', err);
  }
}

try {
  mountApp();
} catch (err) {
  document.getElementById('blank-boot-splash')?.remove();
  console.error('Failed to bootstrap app', err);
}
