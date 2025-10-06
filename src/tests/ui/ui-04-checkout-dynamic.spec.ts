import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { makeCheckoutUser } from '../../utils/faker';

const USER = { username: 'standard_user', password: 'secret_sauce' };

test('UI-04 Checkout with Dynamic Data (Faker)', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const person = makeCheckoutUser();

  await test.step('Login as standard_user', async () => {
    await login.navigateToLogin();
    await login.performLogin(USER.username, USER.password);
  });

  await test.step('Add product to cart and go to checkout', async () => {
    await inventory.waitForPageLoad();
    await inventory.addProductToCart('Sauce Labs Bike Light');
    await inventory.goToCart();
    await cart.checkout();
  });

  await test.step('Enter dynamic checkout information (Faker)', async () => {
    await checkout.fillInfo(person.firstName, person.lastName, person.postalCode);
  });

  await test.step('Finish checkout and verify success', async () => {
    await checkout.finishCheckout();
    await checkout.verifySuccess();
  });
});
