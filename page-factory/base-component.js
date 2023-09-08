const { expect, test } = require('@playwright/test');

exports.BaseComponent = class BaseComponent {
  constructor({ page, locator }) {
    this.page = page;
    this.locator = locator;
  }
}
