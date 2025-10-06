import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { readCsv } from '../../utils/csv';

const rows = readCsv('data/logins.csv');

test.describe('UI-05 Login with all user types (CSV-driven)', () => {
  for (const { username, password, expected, message } of rows) {
    test(`login: ${username} → ${expected}`, async ({ page }) => {
      const login = new LoginPage(page);

      await test.step('Navigate to login page', async () => {
        await login.navigateToLogin();
      });

      await test.step(`Login as ${username}`, async () => {
        await login.performLogin(username, password);
      });

      if (expected === 'success') {
        await test.step('Verify redirected to inventory page', async () => {
          await expect(page).toHaveURL(/inventory.html/);
        });
      } else {
        await test.step('Verify error message displayed', async () => {
          await login.verifyError(message);
        });
      }
    });
  }
});
