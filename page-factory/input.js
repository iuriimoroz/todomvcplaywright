import '@playwright/test';
import { BaseComponent } from '../page-factory';

exports.Input = class Input extends BaseComponent {
    constructor({ page, locator}) {
        super({page, locator});
      }
  async fill(stringToFill) { 
    await this.page.locator(this.locator).fill(stringToFill);  
  }
  async press(buttonToPress) { 
    await this.page.locator(this.locator).press(buttonToPress);  
  }
}
