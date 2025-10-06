import { API_BASE, HEADERS } from '../config/api.config';
import { APIUserResponse } from '../apiTypes/api.types';
import { expect, APIRequestContext, APIResponse } from '@playwright/test';

export const API_BASE_URL =
  process.env.API_BASE_URL || 'http://127.0.0.1:4000';


/**
 * getToken()
 * Logs into the mock server and returns a valid JWT token.
 * - Uses /login endpoint
 * - Fails gracefully if login fails
 */
export async function getToken(request: APIRequestContext): Promise<string> {
  console.log(' [getToken] Logging in to obtain token...');

  const res = await request.post(`${API_BASE}/login`, {
    headers: HEADERS,
    data: { username: 'standard_user', password: 'secret_sauce' },
  });

  // Validate response
  expect(res.ok(), `Login failed with status ${res.status()}`).toBeTruthy();

  const body = (await res.json()) as APIUserResponse;
  expect(body.token, 'Token must be returned from /login').toBeTruthy();

  console.log(' [getToken] Token retrieved successfully.');
  return body.token;
}

/**
 * logResponse()
 * Utility to print clean, formatted response logs in reports or console.
 * - Logs endpoint, status, and parsed JSON
 */
export async function logResponse(endpoint: string, res: APIResponse) {
  console.log(`\n🔹 [${endpoint}] → Status: ${res.status()}`);

  try {
    const json = await res.json();
    console.log('Response Body:', JSON.stringify(json, null, 2));
  } catch (err) {
    console.warn(`[${endpoint}] Non-JSON or empty response`);
  }
}

/**
 * genericPost()
 * Simple reusable POST method with token header for other tests.
 */
export async function genericPost(
  request: APIRequestContext,
  endpoint: string,
  token: string,
  payload: Record<string, any> = {}
): Promise<APIResponse> {
  return request.post(`${API_BASE}${endpoint}`, {
    headers: { ...HEADERS, Authorization: `Bearer ${token}` },
    data: payload,
  });
}

/**
 * genericGet()
 * Reusable GET method with Bearer token.
 */
export async function genericGet(
  request: APIRequestContext,
  endpoint: string,
  token: string
): Promise<APIResponse> {
  return request.get(`${API_BASE}${endpoint}`, {
    headers: { ...HEADERS, Authorization: `Bearer ${token}` },
  });
}
