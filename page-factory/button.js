const { test } = require('@playwright/test');
const { Component, BaseComponent } = require('./base-component');

exports.Button = class Button extends BaseComponent {
    constructor({ page, locator, nth}) {
        super({page, locator});
        this.nth = nth;
      }
  async click() { 
    await this.page.locator(this.locator).nth(this.nth).click();  
  }
}
