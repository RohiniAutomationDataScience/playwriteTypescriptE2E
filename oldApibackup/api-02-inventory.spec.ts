import { test, expect } from '@playwright/test';
const API=process.env.API_BASE_URL||'http://127.0.0.1:4000';
async function token(request:any){ const r=await request.post(`${API}/login`,{data:{username:'standard_user',password:'secret_sauce'}}); const {token}=await r.json(); return token; }
test('API-02 Inventory returns products with valid token', async ({ request }) => {
  const t=await token(request);
  await test.step('GET /inventory with Bearer token', async () => {
    const res=await request.get(`${API}/inventory`,{headers:{Authorization:`Bearer ${t}`}});
    expect(res.ok()).toBeTruthy(); const items=await res.json(); expect(Array.isArray(items)).toBeTruthy(); expect(items.length).toBeGreaterThan(0);
  });
});

