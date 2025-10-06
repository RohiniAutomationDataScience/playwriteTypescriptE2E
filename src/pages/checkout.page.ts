import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]').describe('First Name Input');
    this.lastNameInput = page.locator('[data-test="lastName"]').describe('Last Name Input');
    this.postalCodeInput = page.locator('[data-test="postalCode"]').describe('Postal Code Input');
    this.continueButton = page.locator('[data-test="continue"]').describe('Continue Button');;
    this.finishButton = page.locator('[data-test="finish"]').describe('Finish Button');
    this.successMessage = page.getByText('Thank you for your order!').describe('Order Success Message');
  }

  // alias for clarity
  async fillInfo(first: string, last: string, zip: string) {
    await this.firstNameInput.fill(first);
    await this.lastNameInput.fill(last);
    await this.postalCodeInput.fill(zip);
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async verifySuccess() {
    await expect(this.successMessage).toBeVisible();
  }
}
