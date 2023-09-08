require('dotenv').config();
const test = require('@playwright/test');

exports.BasePage = class BasePage {
  constructor(page) {
    this.page = page;
  }
  async navigate() {
    await this.page.goto(process.env.BASE_URL);
  }
}
