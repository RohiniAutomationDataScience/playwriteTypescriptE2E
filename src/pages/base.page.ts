import { Page, expect, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(path: string) {
    await this.page.goto(path);
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async type(locator: Locator, text: string) {
    await locator.fill(text);
  }

  async assertVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }
}
