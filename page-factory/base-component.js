import { expect } from '@playwright/test';

export class BaseComponent {
  constructor({ page, locator }) {
    this.page = page;
    this.locator = locator;
  }
  getLocator() {
    return this.page.locator(this.locator);
  };
  getErrorMessage(errorMessage) {
    return `Locator "${this.locator}" ${errorMessage}`;
  }
  async shouldHaveText(text) {
    const locator = this.page.locator(this.locator);
    await expect(locator, { message: this.getErrorMessage(`does not have text "${text}"`) }).toContainText(text);
  }
}
