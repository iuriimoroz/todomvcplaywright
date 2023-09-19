import '@playwright/test';
import { BaseComponent } from '../page-factory';

export class Button extends BaseComponent {
    constructor({ page, locator }) {
        super({page, locator});
      }
}
