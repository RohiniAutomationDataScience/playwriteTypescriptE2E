import { test, expect } from '@playwright/test';
const API = process.env.API_BASE_URL || 'https://api.saucedemo.com';

test('API-01 Login API - valid', async ({ request }) => {
  const res = await request.post(`${API}/login`, {
    data: { username: 'standard_user', password: 'secret_sauce' }
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.token).toBeTruthy();
});