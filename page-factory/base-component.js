import '@playwright/test';

export class BaseComponent {
  constructor({ page, locator }) {
    this.page = page;
    this.locator = locator;
  }
  getLocator() {
    return this.locator;
  }
}
