import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';

const USER = { username: 'standard_user', password: 'secret_sauce' };

test.describe('UI-02 Add Product to Cart', () => {
  let login: LoginPage;
  let inventory: InventoryPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    inventory = new InventoryPage(page);
  });

  test('Add "Sauce Labs Backpack" to cart', async ({ page }) => {
    await test.step('Login as standard_user', async () => {
      await login.navigateToLogin();
      await login.performLogin(USER.username, USER.password);
      await login.verifyLoginSuccess();   // new reusable method
    });

    await test.step('Verify Inventory page is loaded', async () => {
      await inventory.waitForPageLoad();
    });

    await test.step('Add "Sauce Labs Backpack" to cart', async () => {
      await inventory.addProductToCart('Sauce Labs Backpack');
    });

    await test.step('Verify cart badge count is 1', async () => {
      await expect(await inventory.getCartCount()).toBe(1);
    });

    await test.step('Open Cart and verify item present', async () => {
      await inventory.goToCart();
      await expect(page.locator('.cart_item')).toHaveCount(1);
      await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    });
  });
});
