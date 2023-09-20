import '@playwright/test';
import { BaseComponent } from '../page-factory';

export class Button extends BaseComponent {
    constructor({ page, locator }) {
        super({page, locator});
      }
      async click(nth = 0) { 
        await this.page.locator(this.locator).nth(nth).click();  
      }
}
