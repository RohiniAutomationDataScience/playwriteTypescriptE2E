import { test, expect } from '@playwright/test';
const API=process.env.API_BASE_URL||'http://127.0.0.1:4000';
async function token(request:any){ const r=await request.post(`${API}/login`,{data:{username:'standard_user',password:'secret_sauce'}}); const {token}=await r.json(); return token; }
test('API-03 Add to Cart + Get Cart', async ({ request }) => {
  const t=await token(request);
  await test.step('POST /cart/add for items 1 and 2', async () => {
    for (const id of [1,2]) { const add=await request.post(`${API}/cart/add`,{headers:{Authorization:`Bearer ${t}`},data:{productId:id,qty:1}}); expect(add.ok()).toBeTruthy(); }
  });
  await test.step('GET /cart should show 2 items', async () => {
    const res=await request.get(`${API}/cart`,{headers:{Authorization:`Bearer ${t}`}});
    expect(res.ok()).toBeTruthy(); const body=await res.json(); expect(body.items.length).toBe(2);
  });
});

