import type { FullConfig } from '@playwright/test';

export default async function globalTeardown(_config: FullConfig) {
  const serverProcess = (globalThis as any).__SERVER_PROCESS__;

  if (serverProcess) {
    console.log('[global-teardown] Stopping mock API server...');
    try {
      serverProcess.kill('SIGTERM');
      console.log('[global-teardown] Mock API server stopped successfully.');
    } catch (err) {
      console.warn('[global-teardown] Warning: Failed to stop mock server gracefully:', err);
    }
  } else {
    console.log('[global-teardown] No mock server to stop.');
  }
}
