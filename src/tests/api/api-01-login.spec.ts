import { test, expect } from '@playwright/test';
import { API_BASE_URL } from '../../utils/apiHelper';

test.describe('API-01 Login API', () => {

  test('Valid login returns token', async ({ request }) => {
    await test.step('POST /login with valid credentials', async () => {
      const res = await request.post(`${API_BASE_URL}/login`, {
        data: { username: 'standard_user', password: 'secret_sauce' },
      });

      expect(res.status(), 'Status should be 200').toBe(200);
      const body = await res.json();
      expect(body.token, 'Token should exist in response').toBeTruthy();
      console.log('[INFO] Valid token:', body.token);
    });
  });

  test('Invalid login is rejected', async ({ request }) => {
    await test.step('POST /login with invalid credentials', async () => {
      const res = await request.post(`${API_BASE_URL}/login`, {
        data: { username: 'nope', password: 'nope' },
      });

      expect([401, 403]).toContain(res.status());
      const body = await res.json();
      expect(body.error).toBeDefined();
    });
  });

  test('Locked-out user is forbidden', async ({ request }) => {
    await test.step('POST /login with locked_out_user', async () => {
      const res = await request.post(`${API_BASE_URL}/login`, {
        data: { username: 'locked_out_user', password: 'secret_sauce' },
      });

      expect(res.status(), 'Locked user should get 403').toBe(403);
      const body = await res.json();
      expect(body.error).toContain('locked');
    });
  });

});
