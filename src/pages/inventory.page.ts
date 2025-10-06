import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  readonly pageTitle: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    // Keeping stable [data-test] 
    this.pageTitle = page.locator('[data-test="title"]').describe('Products Title');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]').describe('Cart Badge');
    this.cartLink  = page.locator('[data-test="shopping-cart-link"]').describe('Cart Link');

  }


  async waitForPageLoad() {
    await this.pageTitle.waitFor({ state: 'visible', timeout: 30000 });
    await expect(this.pageTitle).toBeVisible();
  }
  async addProductToCart(productName: string) {
    const product = this.page
    .locator('.inventory_item')
    .filter({ hasText: productName })
    .describe(`Inventory Item: ${productName}`);

    const addButton = product
    .getByRole('button', { name: /Add to cart/i })
    .describe(`Add to Cart Button for ${productName}`);
  await addButton.click();
}


  async addProductsToCart(productNames: string[]) {
    for (const name of productNames) {
      await this.addProductToCart(name);
    }
  }

  async getCartCount(): Promise<number> {
  if (await this.cartBadge.count() === 0) return 0;
    return parseInt(await this.cartBadge.innerText(), 10);  }

  async goToCart() {
    await this.cartLink.click();
  }
}
