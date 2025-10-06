import { test, expect } from '@playwright/test';
import { API_BASE_URL, getToken } from '../../utils/apiHelper';

test.describe('API-03 Cart Flow', () => {

  test('Add to Cart + Get Cart', async ({ request }) => {
    let token: string;

    await test.step('Login to get valid token', async () => {
      token = await getToken(request);
      expect(token).toBeTruthy();
    });

    await test.step('POST /cart/add with product IDs', async () => {
      const addRes = await request.post(`${API_BASE_URL}/cart/add`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId: 1, qty: 2 },
      });

      expect(addRes.status(), 'Add-to-cart should return 200').toBe(200);
      const addBody = await addRes.json();
      expect(addBody.added).toBeTruthy();
    });

    await test.step('GET /cart to verify items', async () => {
      const cartRes = await request.get(`${API_BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      expect(cartRes.status(), 'Cart retrieval should succeed').toBe(200);
      const cartBody = await cartRes.json();
      expect(cartBody.items.length).toBeGreaterThan(0);
      expect(cartBody.items[0]).toMatchObject({ productId: 1, qty: 2 });
    });
  });

});
