// src/tests/ui/ui-01-login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

const USERS = [
  { username: 'standard_user', password: 'secret_sauce', expected: 'success' },
  { username: 'locked_out_user', password: 'secret_sauce', expected: 'locked' },
  { username: 'problem_user', password: 'secret_sauce', expected: 'success' },
  { username: 'performance_glitch_user', password: 'secret_sauce', expected: 'success' },
  { username: 'error_user', password: 'secret_sauce', expected: 'success' }
];

test.describe('UI-01 Login with all user types', () => {
  let login: LoginPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.navigateToLogin();
  });

  // Using `for...of` loop (best for flexibility & debugging)
  for (const { username, password, expected } of USERS) {
    test(`login: ${username} → ${expected}`, async ({ page }) => {
      await test.step(`Perform login as ${username}`, async () => {
        await login.performLogin(username, password);
      });

      if (expected === 'success') {
        await test.step('Verify redirected to inventory page', async () => {
          await expect(page.locator('[data-test="title"]')).toHaveText('Products');
        });
      } else if (expected === 'locked') {
        await test.step('Verify locked user error message', async () => {
          await expect(login.errorMessage).toBeVisible();
          await expect(login.errorMessage).toContainText('locked');
        });
      }
    });
  }

  //  Alternative (compact doc-style)
  // USERS.forEach(({ username, password, expected }) => {
  //   test(`login: ${username} → ${expected}`, async ({ page }) => {
  //     ...
  //   });
  // });
});
