import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';

const USER = { username: 'standard_user', password: 'secret_sauce' };
const PRODUCTS = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Fleece Jacket'];

test('UI-06 Add Multiple Products (POM)', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await test.step('Login as standard_user', async () => {
    await login.navigateToLogin();
    await login.performLogin(USER.username, USER.password);
    await inventory.waitForPageLoad();
  });

  await test.step('Add multiple products', async () => {
    await inventory.addProductsToCart(PRODUCTS);
  });

  await test.step('Verify cart badge and items', async () => {
    expect(await inventory.getCartCount()).toBe(PRODUCTS.length);
    await inventory.goToCart();
    await expect(page.locator('.cart_item')).toHaveCount(PRODUCTS.length);
  });
});
