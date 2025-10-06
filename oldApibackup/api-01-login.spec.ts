import { test, expect } from '@playwright/test';
const API=process.env.API_BASE_URL||'http://127.0.0.1:4000';
test.describe('API-01 Login API', () => {
  test('Valid login returns token', async ({ request }) => {
    await test.step('POST /login with valid credentials', async () => {
      const res=await request.post(`${API}/login`,{data:{username:'standard_user',password:'secret_sauce'}});
      expect(res.status()).toBe(200); const body=await res.json(); expect(body.token).toBeTruthy();
    });
  });
  test('Invalid login is rejected', async ({ request }) => {
    await test.step('POST /login with invalid credentials', async () => {
      const res=await request.post(`${API}/login`,{data:{username:'nope',password:'nope'}});
      expect([401,403]).toContain(res.status());
    });
  });
  test('Locked out user is forbidden', async ({ request }) => {
    await test.step('POST /login with locked_out_user', async () => {
      const res=await request.post(`${API}/login`,{data:{username:'locked_out_user',password:'secret_sauce'}});
      expect(res.status()).toBe(403);
    });
  });
});

