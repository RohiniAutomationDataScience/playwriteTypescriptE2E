import { test, expect } from '@playwright/test';
import { API_BASE_URL, getToken } from '../../utils/apiHelper';

test.describe('API-02 Inventory', () => {

  test('Inventory returns products with valid token', async ({ request }) => {
    let token: string;

    await test.step('Login to get Bearer token', async () => {
      token = await getToken(request);
      expect(token).toBeTruthy();
    });

    await test.step('GET /inventory using valid Bearer token', async () => {
      const res = await request.get(`${API_BASE_URL}/inventory`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      expect(res.status(), 'Inventory endpoint should return 200').toBe(200);
      const body = await res.json();
      expect(Array.isArray(body)).toBeTruthy();
      expect(body.length).toBeGreaterThan(0);
    });
  });

  test('Unauthorized request should fail without token', async ({ request }) => {
    await test.step('GET /inventory without Bearer token', async () => {
      const res = await request.get(`${API_BASE_URL}/inventory`);
      expect(res.status(), 'Should fail with 401').toBe(401);
    });
  });

});
