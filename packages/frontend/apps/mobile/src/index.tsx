import './setup';

import { Telemetry } from '@blank/core/components/telemetry';
import { createRoot } from 'react-dom/client';

import { App } from './app';

function mountApp() {
  const root = document.getElementById('app');
  if (!root) {
    return;
  }
  try {
    createRoot(root).render(
      <>
        <Telemetry />
        <App />
      </>
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
