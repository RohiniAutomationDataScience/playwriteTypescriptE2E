import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    //this.usernameInput = page.locator('#user-name').describe('Username Input');
    this.usernameInput = page.locator('[data-test="username"]').describe('Username Input');
    this.passwordInput =  page.locator('[data-test="password"]').describe('Password Input');
    this.loginButton   = page.locator('[data-test="login-button"]').describe('Login Button');
    this.errorMessage  = page.locator('[data-test="error"]').describe('Error Message');
  }

  async navigateToLogin() {
    await this.page.goto('/');
  }

  async performLogin(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    await expect(this.page.locator('[data-test="title"]').describe('Inventory Page Title'))
      .toHaveText('Products');
  }

  async verifyError(expectedMessage?: string) {
    await expect(this.errorMessage).toBeVisible();
    if (expectedMessage) {
      await expect(this.errorMessage).toContainText(expectedMessage);
    }
  }
}
