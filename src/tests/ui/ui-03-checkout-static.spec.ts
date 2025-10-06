import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { CheckoutPage } from '../../pages/checkout.page';

test('UI-03 Complete checkout with static data', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const checkout = new CheckoutPage(page);

  await login.navigateToLogin();
  await login.performLogin('standard_user', 'secret_sauce');
  await inventory.waitForPageLoad();
  await inventory.addProductToCart('Sauce Labs Backpack');
  await inventory.goToCart();

  await page.getByRole('button', { name: 'Checkout' }).click();

  await checkout.fillInfo('Rohini', 'Sap', '411001');
  await checkout.finishCheckout();
  await checkout.verifySuccess();

});
