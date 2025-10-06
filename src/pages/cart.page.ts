// src/pages/cart.page.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly cartTitle: Locator;

  constructor(page: Page) {
    super(page);
    // Preferred data-test attributes as available
    this.cartItems = page.locator('[data-test="inventory-item"]').describe('Cart items'); 
    this.checkoutButton = page.locator('[data-test="checkout"]').describe('order checkout page'); 
    this.cartTitle = page.locator('[data-test="title"]').describe('cart title');
  }

  async verifyCartPageLoaded() {
    await expect(this.cartTitle).toHaveText('Your Cart');
  }

  async items() {
    return this.cartItems;
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async removeItem(productName: string) {
    const product = this.page.locator('.cart_item')
    .filter({ hasText: productName })
    .describe(`Cart Item:  : ${productName}`)
    
    await product.getByRole('button', { name: /Remove/i })
    .describe(`Remove Button for : ${productName}`)
    .click();
  }
}
