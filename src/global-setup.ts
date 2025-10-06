import type { FullConfig } from '@playwright/test';
import { spawn } from 'child_process';
import waitOn from 'wait-on';
import http from 'http';

let serverProcess: ReturnType<typeof spawn> | null = null;

//  Helper: Check if port 4000 already in use
async function isPortInUse(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = http
      .createServer()
      .listen(port, '127.0.0.1', () => {
        server.close(() => resolve(false)); // Free
      })
      .on('error', () => resolve(true)); // In use
  });
}

export default async function globalSetup(_config: FullConfig) {
  const isApiRun =
    process.env.TEST_TYPE === 'api' ||
    _config.projects.some((p) => p.name.toLowerCase().includes('api'));

  if (!isApiRun) {
    console.log('[global-setup] UI run detected → skipping mock server start.');
    return;
  }

  console.log('[global-setup] API run detected → starting mock API server...');
  const port = 4000;

  //  1. Check if port already in use
  const portUsed = await isPortInUse(port);
  if (portUsed) {
    console.log(`[global-setup] Port ${port} already in use → skipping mock server spawn.`);
    return;
  }

  //  2. Start mock server if free
  try {
    serverProcess = spawn('node', ['mock/server.js'], {
      stdio: 'inherit',
      shell: true,
    });

    //  3. Wait until /health responds
    await waitOn({
      resources: [`http://127.0.0.1:${port}/health`],
      timeout: 25000,
      interval: 500,
    });

    console.log('[global-setup] Mock API server is ready.');
    (globalThis as any).__SERVER_PROCESS__ = serverProcess;
  } catch (err) {
    console.error('[global-setup] Server startup failed:', err);
    serverProcess?.kill();
    throw err;
  }
}
